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
import { SECONDS_PER_DAY, SECONDS_PER_MINUTE } from './constants';

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
  formatTime?: (date: Date) => string;
  fuzzyInputProps?: InputProps;
  max?: string;
  min?: string;
  showDropdown?: 'click' | 'none' | null;
  toggleAriaLabel?: string;
  value?: string;
}

const AsString: React.FC<AsStringProps> = ({
  className = '',
  disabled,
  formatTime,
  forwardedRef,
  fuzzyInputProps = {},
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

  useImperativeHandle(forwardedRef, () => localRef.current);
  const [focus, setFocus] = useState(false);
  const [validity, setValidity] = useState(true);

  const showDropdown: 'click' | undefined =
    customShowDropdown === 'click' ? 'click' : undefined;

  // value is the true, controlled value, patched for undefined / empty
  const value = useMemo(() => valueOrUndefined || '', [valueOrUndefined]);

  const step: number | undefined = useMemo(() => {
    // Parsing undefined as a string and then parsing Int produces NaN, which is guarded against.
    const safeStep: number | undefined = parseInt(customStep as string, 10);

    if (
      !safeStep ||
      Number.isNaN(safeStep) ||
      safeStep < SECONDS_PER_MINUTE ||
      safeStep > SECONDS_PER_DAY
    ) {
      return undefined;
    }

    return safeStep;
  }, [customStep]);

  const dropdownStep: number | undefined = useMemo(
    () => (step && step >= 60 * 10 ? step : undefined),
    [step]
  );

  const stepFrom = useMemo(() => {
    if (min) {
      return min;
    }

    const start = getStartOfDay(new Date());
    return getShortTimeString(start.getHours(), start.getMinutes());
  }, [min]);

  // Fuzzy value is user input.
  const [fuzzyValue, setFuzzyValue] = useState(
    value ? getLocaleTimeStringFromShortTimeString(value, { formatTime }) : ''
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
    [shadowTimeInputRef, value]
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
    setFuzzyValue(
      value ? getLocaleTimeStringFromShortTimeString(value, { formatTime }) : ''
    );
  };

  const handleSelectMenuItem = (e: { target: { value: Date } }) => {
    const dateTime = e.target.value;

    const label =
      typeof formatTime === 'function'
        ? formatTime(dateTime)
        : dateTime.toLocaleTimeString([], {
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
      setFuzzyValue(
        value
          ? getLocaleTimeStringFromShortTimeString(value, { formatTime })
          : ''
      );
    }

    syncValidity(shadowTimeInputRef, localRef);
  }, [formatTime, localRef, shadowTimeInputRef, step, value]);

  // Sync validity on min/max changes
  useEffect(() => {
    syncValidity(shadowTimeInputRef, localRef);
  }, [localRef, max, min, shadowTimeInputRef]);

  return (
    <div
      className={classNames(styles.InputTime, inputStyles.Input, className, {
        [inputStyles.disabled]: disabled,
        [inputStyles.invalid]: !validity,
        [inputStyles.focus]: focus,
      })}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...passedProps}
    >
      <Input
        className={styles.Input}
        disabled={disabled}
        onBlur={handleBlurFuzzyValue}
        onChange={handleChangeFuzzyValue}
        ref={localRef}
        value={fuzzyValue}
        {...fuzzyInputProps}
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
            className={styles.addons}
            disabled={disabled}
            formatTime={formatTime}
            max={max}
            min={min}
            onSelectMenuItem={handleSelectMenuItem}
            showDropdown={showDropdown}
            step={dropdownStep}
            stepFrom={stepFrom}
            toggleAriaLabel={toggleAriaLabel}
            value={value}
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
