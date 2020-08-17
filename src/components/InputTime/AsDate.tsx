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
    setInvalidMax(false);

    if (
      Number.isNaN(maxDate.valueOf()) ||
      Number.isNaN(valueDate.valueOf()) ||
      maxDate > getEndOfDay(valueDate, { timeZoneOffset })
    ) {
      return '';
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
    setInvalidMin(false);

    if (
      Number.isNaN(minDate.valueOf()) ||
      Number.isNaN(valueDate.valueOf()) ||
      minDate < getStartOfDay(valueDate, { timeZoneOffset })
    ) {
      return '';
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

    let nextDate = new Date(valueDateString || '');

    nextDate = Number.isNaN(nextDate.valueOf()) ? new Date() : nextDate;

    if (e.target.value) {
      const maxDate = new Date(maxDateString || '');
      const minDate = new Date(minDateString || '');

      const selectedTimeOfDay = getDateTimeFromShortTimeString(e.target.value, {
        timeZoneOffset,
      });

      nextDate.setHours(selectedTimeOfDay.getHours());
      nextDate.setMinutes(selectedTimeOfDay.getMinutes());
      nextDate.setSeconds(0);
      nextDate.setMilliseconds(0);

      /*
        When the user is in a different time zone than specified by
        `timeZoneOffset`, the valid options for single date will appear to be on
        different calendar dates.

        E.g. For a user in UTC, India's "04:30" and "05:30" options will be on
        different dates.

        Since the options never span more than 24 hours, this cheesy logic
        works to force the selection into the correct date.
      */
      if (nextDate > maxDate) {
        nextDate.setDate(nextDate.getDate() - 1);
      }

      if (nextDate < minDate) {
        nextDate.setDate(nextDate.getDate() + 1);
      }

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
