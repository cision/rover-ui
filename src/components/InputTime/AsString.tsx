import React, {
  Fragment,
  RefObject,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import Input, { InputProps } from '../Input';

import {
  getLocaleTimeStringFromShortTimeString,
  guessTimeFromString,
  handleDispatchNativeInputChange,
} from './utils';

const syncValidity = (
  refFrom?: RefObject<HTMLInputElement>,
  refTo?: RefObject<HTMLInputElement>
) => {
  if (refTo?.current && refFrom?.current) {
    refTo.current.setCustomValidity(refFrom.current.validationMessage);
  }
};

export interface AsStringProps
  extends Omit<InputProps, 'value' | 'max' | 'min'> {
  max?: string;
  min?: string;
  value?: string;
}

const AsString: React.FC<AsStringProps> = ({
  forwardedRef,
  max,
  min,
  onChange,
  value: valueOrUndefined,
  ...passedProps
}) => {
  const localRef = useRef<HTMLInputElement>(null) as MutableRefObject<
    HTMLInputElement
  >;

  const shadowTimeInputRef = useRef<HTMLInputElement>(null) as MutableRefObject<
    HTMLInputElement
  >;

  useImperativeHandle(forwardedRef, () => localRef.current, []);

  // value is the true, controlled value, patched for undefined / empty
  const value = useMemo(() => valueOrUndefined || '', [valueOrUndefined]);

  // Fuzzy value is user input.
  const [fuzzyValue, setFuzzyValue] = useState(
    value ? getLocaleTimeStringFromShortTimeString(value) : ''
  );

  const handleChangeFuzzyValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFuzzyValue(e.target.value);

    if (e.target.value) {
      const { time: nextValue } = guessTimeFromString(e.target.value);

      if (nextValue && nextValue !== value && shadowTimeInputRef.current) {
        handleDispatchNativeInputChange(shadowTimeInputRef.current, nextValue);
      }
    }
  };

  const handleBlurFuzzyValue = () => {
    setFuzzyValue(value ? getLocaleTimeStringFromShortTimeString(value) : '');
  };

  // Sync shadow input and fuzzy input to controlled value
  useEffect(() => {
    if (shadowTimeInputRef.current) {
      handleDispatchNativeInputChange(shadowTimeInputRef.current, value);
    }

    if (localRef?.current && document.activeElement !== localRef?.current) {
      setFuzzyValue(value ? getLocaleTimeStringFromShortTimeString(value) : '');
    }

    syncValidity(shadowTimeInputRef, localRef);
  }, [localRef, value]);

  // Sync validity on min/max changes
  useEffect(() => {
    syncValidity(shadowTimeInputRef, localRef);
  }, [localRef, max, min]);

  return (
    <Fragment>
      <Input
        {...passedProps}
        value={fuzzyValue}
        ref={localRef}
        onBlur={handleBlurFuzzyValue}
        onChange={handleChangeFuzzyValue}
      />
      {/*
        Shadow input for storing and dispatching change events to model
        value (as opposed to the fuzzy value)
      */}
      <input
        max={max}
        min={min}
        onChange={onChange || (() => {})}
        ref={shadowTimeInputRef}
        style={{ display: 'none' }}
        tabIndex={-1}
        type="time"
      />
    </Fragment>
  );
};

export default AsString;
