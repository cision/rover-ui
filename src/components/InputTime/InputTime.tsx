import React, {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';

import Icon from '../Icon';
import Input, { InputProps } from '../Input';
import inputStyles from '../Input/Input.module.css';

import {
  getEndOfDay,
  getShortTimeString,
  getStartOfDay,
  getLocaleTimeStringFromShortTimeString,
  guessTimeFromString,
} from './utils';

import styles from './InputTime.module.css';
import Dropdown from './Dropdown';

/*
Desired features:
- Add an optional dropdown that lets the user select a time quickly
-- Needs to center selection on current
-- Needs width tweaks
- Add configurable steps for hour/minute/30/15/5 minutes/auto
-- Configurable steps should be enforced on selections
-- Auto steps should be enforced for dropdown options only
*/

interface InputTimeProps extends Omit<InputProps, 'value' | 'max' | 'min'> {
  max?: Date | string;
  min?: Date | string;
  value?: Date | string;
}

export const InputTime: React.FC<InputTimeProps> = ({
  disabled: initDisabled,
  forwardedRef,
  max,
  min,
  value,
  ...passedProps
}) => {
  let disabled = initDisabled;

  if (value instanceof Date) {
    const maxDate = max instanceof Date ? max : undefined;
    const minDate = min instanceof Date ? min : undefined;
    const now = new Date();

    if (maxDate && maxDate < getStartOfDay(now)) {
      disabled = true;
    }

    if (minDate && minDate > getEndOfDay(now)) {
      disabled = true;
    }

    return (
      <InputTimeDate
        {...passedProps}
        disabled={disabled}
        max={maxDate}
        min={minDate}
        value={value}
      />
    );
  }

  const maxString = typeof max === 'string' ? max : undefined;
  const minString = typeof min === 'string' ? min : undefined;
  const valueString = typeof value === 'string' ? value : undefined;

  return (
    <InputTimeString
      {...passedProps}
      max={maxString}
      min={minString}
      value={valueString}
    />
  );
};

interface InputTimeDateProps extends Omit<InputProps, 'value' | 'max' | 'min'> {
  max?: Date;
  min?: Date;
  value?: Date;
}

export const InputTimeDate: React.FC<InputTimeDateProps> = ({
  max: maxDate,
  min: minDate,
  onChange,
  value: valueDate,
  ...passedProps
}) => {
  const now = new Date();

  const max = useMemo(() => {
    if (maxDate === undefined || maxDate === null) {
      return '';
    }

    if (maxDate > getEndOfDay(now)) {
      return '';
    }

    return getShortTimeString(maxDate.getHours(), maxDate.getMinutes());
  }, [maxDate, now]);

  const min = useMemo(() => {
    if (minDate === undefined || minDate === null) {
      return '';
    }

    if (minDate < getStartOfDay(now)) {
      return '';
    }

    return getShortTimeString(minDate.getHours(), minDate.getMinutes());
  }, [minDate, now]);

  const value = useMemo(() => {
    return valueDate !== undefined && valueDate !== null
      ? getShortTimeString(valueDate.getHours(), valueDate.getMinutes())
      : '';
  }, [valueDate]);

  return <InputTimeString {...passedProps} max={max} min={min} value={value} />;
};

interface InputTimeStringProps
  extends Omit<InputProps, 'value' | 'max' | 'min'> {
  max?: string;
  min?: string;
  showDropdown?: 'focus' | 'click' | 'none' | null;
  step?: number | string;
  value?: string;
}

export const InputTimeString: React.FC<InputTimeStringProps> = ({
  className = '',
  disabled,
  forwardedRef = undefined,
  max,
  min,
  onChange,
  showDropdown: customShowDropdown = 'click',
  step,
  value,
  ...passedProps
}) => {
  const mainRef = useRef<HTMLInputElement | null>(null);
  const shadowTimeInputRef = useRef<HTMLInputElement | null>(null);
  const [validity, setValidity] = useState(true);

  const showDropdown: 'focus' | 'click' | undefined =
    (customShowDropdown === 'focus' && 'focus') ||
    (customShowDropdown === 'click' && 'click') ||
    undefined;

  const syncValidity = () => {
    if (mainRef.current && shadowTimeInputRef.current) {
      mainRef.current.setCustomValidity(
        shadowTimeInputRef.current.validationMessage
      );

      setValidity(!shadowTimeInputRef.current.validationMessage);
    }
  };

  useEffect(() => {
    syncValidity();
  }, [max, min]);

  const valueString = useMemo(() => {
    if (value === '') {
      const now = new Date();
      return getShortTimeString(now.getHours(), now.getMinutes());
    }

    return value;
  }, [value]);

  // Fuzzy value is user input.
  const [fuzzyValue, setFuzzyValue] = useState(
    valueString ? getLocaleTimeStringFromShortTimeString(valueString) : ''
  );
  /*
    modelValue is a `hh:mm` formatted string to
    conform to native input[type="time"] controls.
  */
  const [modelValue, setModelValue] = useState(valueString);

  const handleChangeModelValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In fuzzy mode, the event is fired by a shadow input, and this condition
    // syncs the validation state between shadow and visible inputs
    if (mainRef.current !== e.target) {
      syncValidity();
    }

    setModelValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  const changeShadowTimeInput = useCallback(
    (nextModelValue?: string) => {
      // Need step logic
      // If custom step set, pass it in.
      // If auto-step set, pass it in.
      if (
        nextModelValue &&
        nextModelValue !== modelValue &&
        shadowTimeInputRef.current
      ) {
        /*
        To dispatch a change programmatically from a native input,
        you have to use a native input setter. Otherwise, React swallows it.
        https://stackoverflow.com/a/46012210
      */
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(
            shadowTimeInputRef.current,
            nextModelValue
          );
          const passedEvent = new Event('input', { bubbles: true });
          shadowTimeInputRef.current.dispatchEvent(passedEvent);
        }
      }
    },
    [modelValue]
  );

  const handleChangeFuzzyValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFuzzyValue(e.target.value);

    if (e.target.value) {
      const { time: nextModelValue } = guessTimeFromString(e.target.value);
      changeShadowTimeInput(nextModelValue);
    }
  };

  const handleBlurFuzzyValue = () => {
    if (mainRef?.current?.checkValidity() === false) {
      return;
    }

    if (modelValue) {
      setFuzzyValue(getLocaleTimeStringFromShortTimeString(modelValue));
    } else {
      setFuzzyValue('');
    }
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

  return (
    <Fragment>
      <div
        className={classNames(styles.InputTime, inputStyles.Input, className, {
          [styles.with2Addons]: showDropdown,
          [styles.with1Addon]: !showDropdown,
          [inputStyles.invalid]: !validity,
          [inputStyles.disabled]: disabled,
        })}
      >
        <Input
          {...passedProps}
          className={classNames(styles.Input)}
          disabled={disabled}
          onBlur={handleBlurFuzzyValue}
          onChange={handleChangeFuzzyValue}
          ref={typeof forwardedRef === 'function' ? forwardedRef : mainRef}
          value={fuzzyValue}
        />
        {showDropdown ? (
          <Dropdown
            className={styles.addons}
            disabled={disabled}
            max={max}
            min={min}
            modelValue={modelValue}
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
      </div>
      {/*
        Shadow input for storing and dispatching change events to model
        value (as opposed to the fuzzy value)
      */}
      <input
        max={max}
        min={min}
        onChange={handleChangeModelValue}
        ref={shadowTimeInputRef}
        style={{ display: 'none' }}
        tabIndex={-1}
        type="time"
      />
    </Fragment>
  );
};

export default forwardRef<HTMLInputElement, InputTimeStringProps>(
  (props, ref) => {
    return <InputTime {...props} forwardedRef={ref || undefined} />;
  }
);
