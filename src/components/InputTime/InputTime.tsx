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

import EasyDropdown from '../EasyDropdown';
import Icon from '../Icon';
import Input, { InputProps } from '../Input';

import {
  getEndOfDay,
  getShortTimeString,
  getStartOfDay,
  getLocaleTimeStringFromShortTimeString,
  guessTimeFromString,
} from './utils';

import styles from './InputTime.module.css';

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
  showDropdown?: boolean;
  step?: number | string;
  value?: string;
}

export const InputTimeString: React.FC<InputTimeStringProps> = ({
  className = '',
  forwardedRef = undefined,
  max,
  min,
  onChange,
  showDropdown = true,
  step,
  value,
  ...passedProps
}) => {
  const mainRef = useRef<HTMLInputElement | null>(null);
  const shadowTimeInputRef = useRef<HTMLInputElement | null>(null);

  const syncValidity = () => {
    if (mainRef.current && shadowTimeInputRef.current) {
      mainRef.current.setCustomValidity(
        shadowTimeInputRef.current.validationMessage
      );
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

  const menuItems = useMemo(() => {
    if (!showDropdown) {
      return [];
    }

    let menuStep = typeof step === 'string' ? parseInt(step, 10) : step;
    menuStep = menuStep || 60 * 60; // One hour, in secords
    const current = getStartOfDay(new Date());
    const end = getEndOfDay(new Date());
    const maxAttempts = 25 * 60 * 5; // 5 minute incremenents, buffer of an hour for daylight savings, plus 1 for start/end point.
    let attempts = 0;

    const options: {
      className: string;
      label: string;
      onClick: Function;
    }[] = [];

    do {
      attempts += 1;

      const label = current.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      });

      const timeString = getShortTimeString(
        current.getHours(),
        current.getMinutes()
      );

      options.push({
        className: styles.menuItem,
        label,
        onClick: () => {
          setFuzzyValue(label);
          changeShadowTimeInput(timeString);
        },
      });

      current.setSeconds(current.getSeconds() + menuStep);
    } while (attempts <= maxAttempts && current < end);

    return options;
  }, [changeShadowTimeInput, showDropdown, step]);

  return (
    <Fragment>
      <Input
        {...passedProps}
        value={fuzzyValue}
        ref={typeof forwardedRef === 'function' ? forwardedRef : mainRef}
        onBlur={handleBlurFuzzyValue}
        onChange={handleChangeFuzzyValue}
        className={classNames(styles.InputTime, className)}
      />
      {showDropdown && (
        <EasyDropdown
          defaultIsOpen={false}
          menuItems={menuItems}
          menuProps={{ position: 'bottomLeft' }}
        >
          <Icon fill="currentColor" name="arrow-drop-down" />
        </EasyDropdown>
      )}
      {/*
        Shadow input for storing and dispatching change events to model
        value (as opposed to the fuzzy value)
      */}
      <div>Max: {max}</div>
      <div>Min: {min}</div>
      <input
        max={max}
        min={min}
        onChange={handleChangeModelValue}
        ref={shadowTimeInputRef}
        style={{ display: 'block' }}
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
