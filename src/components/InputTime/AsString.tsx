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
  getStartOfDay,
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
  step: customStep,
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
  const [focus, setFocus] = useState(false);
  const [validity, setValidity] = useState(true);

  const showDropdown: 'click' | undefined =
    customShowDropdown === 'click' ? 'click' : undefined;

  // value is the true, controlled value, patched for undefined / empty
  const value = useMemo(() => valueOrUndefined || '', [valueOrUndefined]);

  const step: number | undefined = useMemo(() => {
    let safeStep: number | undefined;
    safeStep = typeof customStep === 'number' ? customStep : safeStep;

    safeStep =
      typeof customStep === 'string' ? parseInt(customStep, 10) : safeStep;

    if (
      !safeStep ||
      Number.isNaN(safeStep) ||
      safeStep < 60 * 10 ||
      safeStep > 60 * 60 * 24
    ) {
      return undefined;
    }

    return safeStep;
  }, [customStep]);

  const stepFrom = useMemo(() => {
    if (min) {
      return min;
    }

    const start = getStartOfDay(new Date());
    return getShortTimeString(start.getHours(), start.getMinutes());
  }, [min]);

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

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const handleClickClockIcon = () => {
    if (localRef.current) {
      localRef.current.focus();
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
    setFocus(false);
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
  }, [localRef, step, value]);

  // Sync validity on min/max changes
  useEffect(() => {
    syncValidity(shadowTimeInputRef, localRef);
  }, [localRef, max, min]);

  return (
    <div
      className={classNames(styles.InputTime, inputStyles.Input, className, {
        [inputStyles.disabled]: disabled,
        [inputStyles.invalid]: !validity,
        [inputStyles.focus]: focus,
      })}
      onFocus={handleFocus}
      onBlur={handleBlur}
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
      <div className={styles.addons}>
        <Icon
          className={styles.icon}
          fill="currentColor"
          height={16}
          name="clock"
          onClick={handleClickClockIcon}
          width={16}
        />
        {showDropdown && (
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
            stepFrom={stepFrom}
          />
        )}
      </div>
      {/*
        Shadow input for storing and dispatching change events to model
        value (as opposed to the fuzzy value)
      */}
      <input
        max={max}
        min={min}
        onChange={onChange || (() => {})}
        ref={shadowTimeInputRef}
        step={step}
        style={{ display: 'none' }}
        tabIndex={-1}
        type="time"
      />
    </div>
  );
};

export default AsString;
