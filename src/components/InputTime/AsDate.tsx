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
  getDateTimeFromShortTimeString,
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
  timeZoneOffset,
  value: valueDateString,
  ...passedProps
}) => {
  const [invalidMax, setInvalidMax] = useState(false);
  const [invalidMin, setInvalidMin] = useState(false);

  useEffect(() => {
    if (maxDateString && Number.isNaN(new Date(maxDateString).valueOf())) {
      /* eslint-disable-next-line no-console */
      console.warn(
        '`max` should be an ISO date string when using `InputTime` with dates'
      );
    }

    if (minDateString && Number.isNaN(new Date(minDateString).valueOf())) {
      /* eslint-disable-next-line no-console */
      console.warn(
        '`min` should be an ISO date string when using `InputTime` with dates'
      );
    }

    if (valueDateString && Number.isNaN(new Date(valueDateString).valueOf())) {
      /* eslint-disable-next-line no-console */
      console.warn(
        '`value` should be an ISO date string when using `InputTime` with dates'
      );
    }
  });

  const localRef = useRef<HTMLInputElement>(null) as MutableRefObject<
    HTMLInputElement
  >;

  const shadowDateTimeInputRef = useRef<HTMLInputElement>(
    null
  ) as MutableRefObject<HTMLInputElement>;

  useImperativeHandle(forwardedRef, () => localRef.current);

  // If maxDate makes selected date 100% valid, all times are ok.
  // Otherwise, parse it into a time string for InputTimeAsString
  const max = useMemo(() => {
    const maxDate = new Date(maxDateString || '');
    const valueDate = new Date(valueDateString || '');
    const endOfDay = getEndOfDay(valueDate, { timeZoneOffset });
    setInvalidMax(false);

    if (
      Number.isNaN(maxDate.valueOf()) ||
      Number.isNaN(valueDate.valueOf()) ||
      maxDate > endOfDay
    ) {
      const endOfDayTime = getShortTimeString({
        date: endOfDay,
        timeZoneOffset,
      });

      return endOfDayTime;
    }

    if (maxDate < getStartOfDay(valueDate, { timeZoneOffset })) {
      setInvalidMax(true);
      return '';
    }

    const maxString = getShortTimeString({ date: maxDate, timeZoneOffset });

    return maxString;
  }, [maxDateString, timeZoneOffset, valueDateString]);

  // If minDateString makes selected date 100% valid, all times are ok.
  // Otherwise, parse it into a time string for InputTimeAsString
  const min = useMemo(() => {
    const minDate = new Date(minDateString || '');
    const valueDate = new Date(valueDateString || '');
    const startOfDay = getStartOfDay(valueDate, { timeZoneOffset });
    setInvalidMin(false);

    if (
      Number.isNaN(minDate.valueOf()) ||
      Number.isNaN(valueDate.valueOf()) ||
      minDate < startOfDay
    ) {
      const startOfDayTime = getShortTimeString({
        date: startOfDay,
        timeZoneOffset,
      });

      return startOfDayTime;
    }

    if (minDate > getEndOfDay(valueDate, { timeZoneOffset })) {
      setInvalidMin(true);
      return '';
    }

    const minString = getShortTimeString({ date: minDate, timeZoneOffset });

    return minString;
  }, [minDateString, timeZoneOffset, valueDateString]);

  const value = useMemo(() => {
    const valueDate = new Date(valueDateString || '');

    if (Number.isNaN(valueDate.valueOf())) {
      return '';
    }

    const valueString = getShortTimeString({ date: valueDate, timeZoneOffset });

    return valueString;
  }, [timeZoneOffset, valueDateString]);

  const handleChangeString = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }

    let date = new Date(valueDateString || '');
    date = Number.isNaN(date.valueOf()) ? new Date() : date;

    if (e.target.value) {
      const nextDate = getDateTimeFromShortTimeString({
        date,
        time: e.target.value,
        timeZoneOffset,
      });

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
        timeZoneOffset={timeZoneOffset}
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
