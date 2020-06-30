import React, {
  Fragment,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  getEndOfDay,
  getShortTimeString,
  getStartOfDay,
  handleDispatchNativeInputChange,
} from './utils';

import InputTimeAsString, { AsStringProps } from './AsString';

export const AsDate: React.FC<AsStringProps> = ({
  disabled = false,
  forwardedRef,
  max: maxDateString,
  min: minDateString,
  onChange,
  value: valueDateString,
  ...passedProps
}) => {
  const [invalidMax, setInvalidMax] = useState(false);
  const [invalidMin, setInvalidMin] = useState(false);

  useEffect(() => {
    if (maxDateString && Number.isNaN(new Date(maxDateString).valueOf())) {
      console.warn('`max` should be an ISO date string');
    }

    if (minDateString && Number.isNaN(new Date(minDateString).valueOf())) {
      console.warn('`min` should be an ISO date string');
    }

    if (valueDateString && Number.isNaN(new Date(valueDateString).valueOf())) {
      console.warn('`value` should be an ISO date string');
    }
  });

  const localRef = useRef<HTMLInputElement>(null) as MutableRefObject<
    HTMLInputElement
  >;

  const shadowDateTimeInputRef = useRef<HTMLInputElement>(
    null
  ) as MutableRefObject<HTMLInputElement>;

  useImperativeHandle(forwardedRef, () => localRef.current, []);

  // If maxDate makes selected date 100% valid, all times are ok.
  // Otherwise, parse it into a time string for InputTimeAsString
  const max = useMemo(() => {
    const maxDate = new Date(maxDateString || '');
    const valueDate = new Date(valueDateString || '');
    setInvalidMax(false);

    if (
      Number.isNaN(maxDate.valueOf()) ||
      Number.isNaN(valueDate.valueOf()) ||
      maxDate > getEndOfDay(valueDate)
    ) {
      return '';
    }

    if (maxDate < getStartOfDay(valueDate)) {
      setInvalidMax(true);
      return '';
    }

    return getShortTimeString(maxDate.getHours(), maxDate.getMinutes());
  }, [maxDateString, valueDateString]);

  // If minDateString makes selected date 100% valid, all times are ok.
  // Otherwise, parse it into a time string for InputTimeAsString
  const min = useMemo(() => {
    const minDate = new Date(minDateString || '');
    const valueDate = new Date(valueDateString || '');
    setInvalidMin(false);

    if (
      Number.isNaN(minDate.valueOf()) ||
      Number.isNaN(valueDate.valueOf()) ||
      minDate < getStartOfDay(valueDate)
    ) {
      return '';
    }

    if (minDate > getEndOfDay(valueDate)) {
      setInvalidMin(true);
      return '';
    }

    return getShortTimeString(minDate.getHours(), minDate.getMinutes());
  }, [minDateString, valueDateString]);

  const value = useMemo(() => {
    const valueDate = new Date(valueDateString || '');

    if (Number.isNaN(valueDate.valueOf())) {
      return '';
    }

    return getShortTimeString(valueDate.getHours(), valueDate.getMinutes());
  }, [valueDateString]);

  const handleChangeString = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }

    let nextDate = new Date(valueDateString || '');

    nextDate = Number.isNaN(nextDate.valueOf()) ? new Date() : nextDate;

    if (e.target.value) {
      const [hoursString, minutesString] = e.target.value.split(':');
      nextDate.setHours(parseInt(hoursString, 10));
      nextDate.setMinutes(parseInt(minutesString, 10));
      nextDate.setSeconds(0);
      nextDate.setMilliseconds(0);
      const nextDateString = nextDate.toISOString();

      if (
        nextDateString !== valueDateString &&
        shadowDateTimeInputRef.current
      ) {
        handleDispatchNativeInputChange(
          shadowDateTimeInputRef.current,
          nextDateString
        );
      }
    }
  };

  return (
    <Fragment>
      <InputTimeAsString
        {...passedProps}
        disabled={invalidMax || invalidMin || disabled}
        forwardedRef={localRef}
        max={max}
        min={min}
        onChange={handleChangeString}
        value={value}
      />
      <input
        onChange={onChange || (() => {})}
        ref={shadowDateTimeInputRef}
        style={{ display: 'none' }}
        tabIndex={-1}
      />
    </Fragment>
  );
};

export default AsDate;
