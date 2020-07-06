import React, {
  RefObject,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';

import Icon from '../Icon';
import Input, { InputProps } from '../Input';
import inputStyles from '../Input/Input.module.css';

import {
  getLocaleTimeStringFromShortTimeString,
  getShortTimeString,
  guessTimeFromString,
  handleDispatchNativeInputChange,
} from './utils';

import Dropdown from './Dropdown';
import styles from './InputTime.module.css';

export interface AsStringProps
  extends Omit<InputProps, 'value' | 'max' | 'min'> {
  max?: string;
  min?: string;
  showDropdown?: 'click' | 'none' | null;
  toggleAriaLabel?: string;
  value?: string;
}

const AsString: React.FC<AsStringProps> = ({
  className = '',
  disabled,
  forwardedRef,
  max,
  min,
  onChange,
  showDropdown: customShowDropdown = 'click',
  step,
  toggleAriaLabel,
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
  const [validity, setValidity] = useState(true);

  const showDropdown: 'click' | undefined =
    (customShowDropdown === 'click' && 'click') || undefined;

  // value is the true, controlled value, patched for undefined / empty
  const value = useMemo(() => valueOrUndefined || '', [valueOrUndefined]);

  // Fuzzy value is user input.
  const [fuzzyValue, setFuzzyValue] = useState(
    value ? getLocaleTimeStringFromShortTimeString(value) : ''
  );

  const syncValidity = (
    refFrom?: RefObject<HTMLInputElement>,
    refTo?: RefObject<HTMLInputElement>
  ) => {
    if (refTo?.current && refFrom?.current) {
      refTo.current.setCustomValidity(refFrom.current.validationMessage);
      setValidity(!refFrom.current.validationMessage);
    }
  };

  const changeShadowTimeInput = useCallback(
    (nextValue?: string) => {
      if (nextValue && nextValue !== value && shadowTimeInputRef.current) {
        handleDispatchNativeInputChange(shadowTimeInputRef.current, nextValue);
      }
    },
    [value]
  );

  const handleChangeFuzzyValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFuzzyValue(e.target.value);

    if (e.target.value) {
      const { time: nextValue } = guessTimeFromString(e.target.value);
      changeShadowTimeInput(nextValue);
    }
  };

  const handleBlurFuzzyValue = () => {
    setFuzzyValue(value ? getLocaleTimeStringFromShortTimeString(value) : '');
  };

  const handleSelectMenuItem = (e: { target: { value: Date } }) => {
    const dateTime = e.target.value;

    const label = dateTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    const timeString = getShortTimeString(
      dateTime.getHours(),
      dateTime.getMinutes()
    );

    setFuzzyValue(label);
    changeShadowTimeInput(timeString);
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
    <div
      className={classNames(styles.InputTime, inputStyles.Input, className, {
        [inputStyles.disabled]: disabled,
        [inputStyles.invalid]: !validity,
      })}
    >
      <Input
        {...passedProps}
        className={styles.Input}
        disabled={disabled}
        onBlur={handleBlurFuzzyValue}
        onChange={handleChangeFuzzyValue}
        ref={localRef}
        value={fuzzyValue}
      />
      {showDropdown ? (
        <Dropdown
          toggleAriaLabel={toggleAriaLabel}
          className={styles.addons}
          disabled={disabled}
          max={max}
          min={min}
          value={value}
          onSelectMenuItem={handleSelectMenuItem}
          showDropdown={showDropdown}
          step={step}
        />
      ) : (
        <div className={styles.addons}>
          <Icon
            className={styles.icon}
            fill="currentColor"
            height={16}
            name="clock"
            width={16}
          />
        </div>
      )}
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
    </div>
  );
};

export default AsString;
