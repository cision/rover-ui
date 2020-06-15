import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import Input, { InputProps } from '../Input';
import styles from './InputTime.module.css';
import {
  getShortTimeString,
  getLocaleTimeStringFromShortTimeString,
  guessTimeFromString,
} from './utils';

/*
Desired features:
* Fuzzy match a variety of time syntaxes, so users can type or copy/paste times naturally
* On blur, replace fuzzy string with normal string (in local format)
* Add an optional dropdown that lets the user select a time quickly
* Add min/max support for both raw times (less than 10AM) and datetimes (less than 10AM June 9)
* Add configurable steps for hour/minute/30/15/5 minutes/auto
*/

interface InputTimeProps extends Omit<InputProps, 'value' | 'max' | 'min'> {
  forwardedRef: MutableRefObject<HTMLInputElement | null> | null;
  max?: string;
  min?: string;
  value?: string;
}

export const InputTime: React.FC<InputTimeProps> = ({
  className = '',
  forwardedRef = { current: null },
  max,
  min,
  onChange,
  value,
  ...passedProps
}) => {
  const mainRef = useRef<HTMLInputElement | null>(null);
  const shadowTimeInputRef: MutableRefObject<HTMLInputElement | null> = useRef(
    null
  );

  const syncValidity = () => {
    if (mainRef.current && shadowTimeInputRef.current) {
      mainRef.current.setCustomValidity(
        shadowTimeInputRef.current.validationMessage
      );
    }
  };

  useEffect(() => {
    if (forwardedRef?.current) {
      mainRef.current = forwardedRef.current;
    }
  }, [mainRef, forwardedRef]);

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

  const handleChangeFuzzyValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFuzzyValue(e.target.value);

    if (e.target.value) {
      const { time: nextModelValue } = guessTimeFromString(e.target.value);

      // Need step logic
      // If custom step set, pass it in.
      // If auto-step set, pass it in.

      if (nextModelValue !== modelValue && shadowTimeInputRef.current) {
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

  return (
    <>
      <Input
        {...passedProps}
        value={fuzzyValue}
        ref={mainRef}
        onBlur={handleBlurFuzzyValue}
        onChange={handleChangeFuzzyValue}
        className={classNames(styles.InputTime, className)}
      />
      {/*
        Shadow input for storing and dispatching change events to model
        value (as opposed to the fuzzy value)
      */}
      <input
        className={styles.hidden}
        max={max}
        min={min}
        onChange={handleChangeModelValue}
        ref={shadowTimeInputRef}
        tabIndex={-1}
        type="time"
      />
    </>
  );
};

export default forwardRef<HTMLInputElement, InputTimeProps>((props, ref) => {
  return <InputTime {...props} forwardedRef={ref} />;
});
