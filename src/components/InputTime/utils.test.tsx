import React from 'react';
import { render } from '@testing-library/react';

import {
  getDateTimeFromShortTimeString,
  getEndOfDay,
  getInputTimeMinMaxValidationMessagePolyfill,
  getLocaleTimeStringFromShortTimeString,
  getShortTimeString,
  getStartOfDay,
  guessTimeFromString,
  handleDispatchNativeInputChange,
} from './utils';

const getDayOfMonthFormat = ({ timeZoneName = 'America/Chicago' } = {}) => {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    timeZone: timeZoneName,
  });
};

const getTimeFormat = ({ timeZoneName = 'America/Chicago' } = {}) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: timeZoneName,
  });
};

const getFormattedTimeWithTimeZone = ({
  date,
  timeZoneName,
}): {
  date: Date;
  timeZoneName: string;
} =>
  date.toLocaleTimeString('en-US', {
    timeZone: timeZoneName,
  });

// eslint-disable-next-line import/prefer-default-export
export const guessTimeFromStringInputOutputMap = {
  '1': {
    hours: 1,
    minutes: 0,
  },
  '1 p': {
    hours: 13,
    minutes: 0,
  },
  '3 15': {
    hours: 3,
    minutes: 15,
  },
  '3 15 pm': {
    hours: 15,
    minutes: 15,
  },
  '00:00': {
    hours: 0,
    minutes: 0,
  },
  '12:00': {
    hours: 12,
    minutes: 0,
  },
  '12 a': {
    hours: 0,
    minutes: 0,
  },
  '12 p': {
    hours: 12,
    minutes: 0,
  },
  '7h42': {
    hours: 7,
    minutes: 42,
  },
  '8,19p': {
    hours: 20,
    minutes: 19,
  },
};

const generateDatesWithIncrement = ({ startDate, endDate, stepMinutes }) => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  do {
    const dateCopy = new Date(currentDate);
    dates.push(dateCopy);
    currentDate.setMinutes(currentDate.getMinutes() + stepMinutes);
  } while (currentDate <= endDate);

  return dates;
};

describe('handleDispatchNativeInputChange', () => {
  it('dispatches an on change event', () => {
    const onChange = jest.fn((event) => {
      event.persist();
      return event;
    });

    const { getByTestId } = render(
      <input data-testid="foo" onChange={onChange} type="text" />
    );

    const input = getByTestId('foo');
    handleDispatchNativeInputChange(input as HTMLInputElement, 'bar');
    expect(onChange).toBeCalledTimes(1);

    expect(onChange).toBeCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'bar',
        }),
      })
    );
  });
});

describe('getEndOfDay', () => {
  it('works for local time', () => {
    // Result is cast to UTC, using UTC input, local environment for EOD
    const now = new Date();
    const endOfDay = getEndOfDay(now);
    const startOfNextDay = new Date(endOfDay);
    startOfNextDay.setMilliseconds(startOfNextDay.getMilliseconds() + 1);
    expect(endOfDay.getDate()).toEqual(now.getDate());
    expect(endOfDay.getDate()).not.toEqual(startOfNextDay.getDate());
  });

  it('works for local time from a date constructed with a timezone', () => {
    // Result is cast to UTC, using non-UTC input, local environment for EOD
    const date = new Date('2020-07-20T12:30-02:00');

    const expectedDateString = new Date(date);
    expectedDateString.setDate(expectedDateString.getDate() + 1);
    expectedDateString.setHours(0);
    expectedDateString.setMinutes(0);
    expectedDateString.setSeconds(0);
    expectedDateString.setMilliseconds(-1);

    const endOfDay = getEndOfDay(date);
    expect(endOfDay.toISOString()).toEqual(expectedDateString.toISOString());
  });

  describe('with optional `timeZoneOffset`', () => {
    it('TEST', () => {
      const date = new Date('2020-08-11T20:30:00.000Z');
      // Central Daylight Time
      const timeZoneOffset = 330; // +5:30
      const endOfDay = getEndOfDay(date, { timeZoneOffset });
      expect(endOfDay.valueOf()).toBeGreaterThan(date.valueOf());
    });

    it('different timeZoneOffsets yield different results', () => {
      const date = new Date('2020-07-20T12:30');
      expect(
        getEndOfDay(date, { timeZoneOffset: -300 }).toISOString()
      ).not.toEqual(getEndOfDay(date, { timeZoneOffset: 330 }).toISOString());
    });

    it('works for different time zones', () => {
      // Result is cast to UTC, using UTC input, timeZoneOffset for EOD
      const endOfDayTimeString = '11:59 PM';
      let timeZoneName: string;
      let timeZoneOffset: number;
      let dayOfMonthFormat: Intl.DateTimeFormat;
      let timeFormat: Intl.DateTimeFormat;

      const startDate = new Date('2020-08-11T20:30:00.000Z');
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      const dates = generateDatesWithIncrement({
        startDate,
        endDate,
        stepMinutes: 30,
      });

      // Central Daylight Time
      timeZoneName = 'America/Chicago';
      timeZoneOffset = -300; // -5:00
      dayOfMonthFormat = getDayOfMonthFormat({ timeZoneName });
      timeFormat = getTimeFormat({ timeZoneName });

      dates.forEach((date) => {
        const endOfDay = getEndOfDay(date, { timeZoneOffset });
        const formattedTime = timeFormat.format(endOfDay);
        const formattedDate = dayOfMonthFormat.format(endOfDay);
        expect(formattedDate).toEqual(dayOfMonthFormat.format(date));
        expect(formattedTime).toEqual(endOfDayTimeString);
        expect(endOfDay.valueOf()).toBeGreaterThanOrEqual(date.valueOf());
      });

      // India Standard Time
      timeZoneName = 'Asia/Calcutta';
      timeZoneOffset = 330; // +5:30
      dayOfMonthFormat = getDayOfMonthFormat({ timeZoneName });
      timeFormat = getTimeFormat({ timeZoneName });

      dates.forEach((date) => {
        const endOfDay = getEndOfDay(date, { timeZoneOffset });
        const formattedTime = timeFormat.format(endOfDay);
        const formattedDate = dayOfMonthFormat.format(endOfDay);
        expect(formattedDate).toEqual(dayOfMonthFormat.format(date));
        expect(formattedTime).toEqual(endOfDayTimeString);
        expect(endOfDay.valueOf()).toBeGreaterThanOrEqual(date.valueOf());
      });
    });
  });
});

describe('getStartOfDay', () => {
  it('works for local time', () => {
    // Result is cast to UTC, using UTC input, local environment for EOD
    const now = new Date();
    const startOfDay = getStartOfDay(now);
    const endOfPrevDay = new Date(startOfDay);
    endOfPrevDay.setMilliseconds(endOfPrevDay.getMilliseconds() - 1);
    expect(startOfDay.getDate()).toEqual(now.getDate());
    expect(startOfDay.getDate()).not.toEqual(endOfPrevDay.getDate());
  });

  it('works for local time from a date constructed with a timezone', () => {
    // Result is cast to UTC, using non-UTC input, local environment for EOD
    const date = new Date('2020-07-20T12:30-02:00');

    const expectedDateString = new Date(date);
    expectedDateString.setHours(0);
    expectedDateString.setMinutes(0);
    expectedDateString.setSeconds(0);
    expectedDateString.setMilliseconds(0);

    const startOfDay = getStartOfDay(date);
    expect(startOfDay.toISOString()).toEqual(expectedDateString.toISOString());
  });

  describe('with optional `timeZoneOffset`', () => {
    it('different timeZoneOffsets yield different results', () => {
      const date = new Date('2020-07-20T12:30');
      expect(
        getStartOfDay(date, { timeZoneOffset: -300 }).toISOString()
      ).not.toEqual(
        getStartOfDay(date, { timeZoneOffset: -330 }).toISOString()
      );
    });

    it('works for different time zones', () => {
      // Result is cast to UTC, using UTC input, timeZoneOffset for SOD
      const startOfDayTimeString = '12:00 AM';
      let timeZoneName: string;
      let timeZoneOffset: number;
      let dayOfMonthFormat: Intl.DateTimeFormat;
      let timeFormat: Intl.DateTimeFormat;

      const startDate = new Date('2020-08-11T20:30:00.000Z');
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      const dates = generateDatesWithIncrement({
        startDate,
        endDate,
        stepMinutes: 30,
      });

      // Central Daylight Time
      timeZoneName = 'America/Chicago';
      timeZoneOffset = -300; // -5:00
      dayOfMonthFormat = getDayOfMonthFormat({ timeZoneName });
      timeFormat = getTimeFormat({ timeZoneName });

      dates.forEach((date) => {
        const startOfDay = getStartOfDay(date, { timeZoneOffset });
        const formattedTime = timeFormat.format(startOfDay);
        const formattedDate = dayOfMonthFormat.format(startOfDay);
        expect(formattedDate).toEqual(dayOfMonthFormat.format(date));
        expect(formattedTime).toEqual(startOfDayTimeString);
        expect(startOfDay.valueOf()).toBeLessThanOrEqual(date.valueOf());
      });

      // India Standard Time
      timeZoneName = 'Asia/Calcutta';
      timeZoneOffset = 330; // +5:30
      dayOfMonthFormat = getDayOfMonthFormat({ timeZoneName });
      timeFormat = getTimeFormat({ timeZoneName });

      dates.forEach((date) => {
        const startOfDay = getStartOfDay(date, { timeZoneOffset });
        const formattedTime = timeFormat.format(startOfDay);
        const formattedDate = dayOfMonthFormat.format(startOfDay);
        expect(formattedDate).toEqual(dayOfMonthFormat.format(date));
        expect(formattedTime).toEqual(startOfDayTimeString);
        expect(startOfDay.valueOf()).toBeLessThanOrEqual(date.valueOf());
      });
    });

    it('works for different time zones', () => {
      // Result is cast to UTC, using UTC input, timeZoneOffset for EOD
      const date = new Date('2020-07-20T12:30');
      const startOfDayTimeString = '12:00:00 AM';
      let timeZoneOffset: number;

      // Central Daylight Time
      timeZoneOffset = -300; // -5:00
      const startOfDayCDT = getStartOfDay(date, { timeZoneOffset });

      const formattedTimeCDT = getFormattedTimeWithTimeZone({
        date: startOfDayCDT,
        timeZoneName: 'America/Chicago',
      });

      // India Standard Time
      timeZoneOffset = 330; // +5:30
      const startOfDayIST = getStartOfDay(date, { timeZoneOffset });

      const formattedTimeIST = getFormattedTimeWithTimeZone({
        date: startOfDayIST,
        timeZoneName: 'Asia/Calcutta',
      });

      expect(formattedTimeCDT).toEqual(startOfDayTimeString);
      expect(formattedTimeIST).toEqual(startOfDayTimeString);

      expect(startOfDayCDT.toISOString()).not.toEqual(
        startOfDayIST.toISOString()
      );
    });
  });
});

describe('getShortTimeString', () => {
  it('makes strings in the form "12:30"', () => {
    expect(getShortTimeString({ hours: 12, minutes: 30 })).toEqual('12:30');
  });

  it('pads single digit numbers with "0"', () => {
    expect(getShortTimeString({ hours: 9, minutes: 1 })).toEqual('09:01');
  });

  it('handles zeroes', () => {
    expect(getShortTimeString({ hours: 0, minutes: 0 })).toEqual('00:00');
  });

  it('handles missing hour', () => {
    expect(getShortTimeString({ minutes: 45 })).toEqual('00:45');
  });

  it('handles missing minute', () => {
    expect(getShortTimeString({ hours: 1 })).toEqual('01:00');
  });

  it('handles missing everything', () => {
    expect(getShortTimeString()).toEqual('00:00');
  });
});

describe('getDateTimeFromShortTimeString', () => {
  it('turns hour and minute into a local date', () => {
    let date: Date;

    date = getDateTimeFromShortTimeString('12:30');
    expect(date.toLocaleTimeString('en-US')).toEqual('12:30:00 PM');

    date = getDateTimeFromShortTimeString('00:30');
    expect(date.toLocaleTimeString('en-US')).toEqual('12:30:00 AM');

    date = getDateTimeFromShortTimeString('23:59');
    expect(date.toLocaleTimeString('en-US')).toEqual('11:59:00 PM');
  });

  describe('with optional `timeZoneOffset`', () => {
    it('works for different time zones', () => {
      const dateCDT = getDateTimeFromShortTimeString('12:30', {
        timeZoneOffset: -300,
      });

      const formattedTimeCDT = getFormattedTimeWithTimeZone({
        date: dateCDT,
        timeZoneName: 'America/Chicago',
      });

      const dateIST = getDateTimeFromShortTimeString('12:30', {
        timeZoneOffset: +330,
      });

      const formattedTimeIST = getFormattedTimeWithTimeZone({
        date: dateIST,
        timeZoneName: 'Asia/Calcutta',
      });

      expect(formattedTimeCDT).toEqual('12:30:00 PM');
      expect(formattedTimeIST).toEqual('12:30:00 PM');
      expect(dateCDT.toISOString()).not.toEqual(dateIST.toISOString());
    });
  });
});

describe('getLocaleTimeStringFromShortTimeString', () => {
  it('formats a time with the default locale', () => {
    const expectedDate = new Date();
    expectedDate.setHours(12);
    expectedDate.setMinutes(30);
    expectedDate.setSeconds(0);
    expectedDate.setMilliseconds(0);

    const expectedString = expectedDate.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });

    expect(getLocaleTimeStringFromShortTimeString('12:30')).toEqual(
      expectedString
    );
  });

  describe('with optional `formatTime`', () => {
    it('uses a custom format', () => {
      const formatTime = (date: Date) =>
        `${date.getMinutes()}__${date.getHours()}`;

      expect(
        getLocaleTimeStringFromShortTimeString('12:30', {
          formatTime,
        })
      ).toEqual('30__12');
    });
  });
});

describe('guessTimeFromString', () => {
  it('handles several time input patterns', () => {
    Object.entries(guessTimeFromStringInputOutputMap).forEach(
      ([input, expected]) => {
        /*
        Don't use `userEvent.type()`` here because typing "3:15 pm" sets the
        value multiple times, with 03:00, 03:10, 03:15, and 15:15 values
      */
        const output = guessTimeFromString(input);
        expect(output).toStrictEqual({
          ...expected,
          time: getShortTimeString({
            hours: expected.hours,
            minutes: expected.minutes,
          }),
        });
      }
    );
  });
});

describe('getInputTimeMinMaxValidationMessagePolyfill', () => {
  it('handles validation with `max` and `min`', () => {
    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        max: '20:00',
        min: '10:00',
        value: '15:00',
      })
    ).toBeFalsy();

    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        max: '20:00',
        min: '10:00',
        value: '09:59',
      })
    ).toBeTruthy();

    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        max: '20:00',
        min: '10:00',
        value: '20:01',
      })
    ).toBeTruthy();
  });

  it('handles validation with `max` only', () => {
    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        max: '10:00',
        value: '10:00',
      })
    ).toBeFalsy();

    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        max: '10:00',
        value: '10:01',
      })
    ).toBeTruthy();
  });

  it('handles validation with `min` only', () => {
    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        min: '10:00',
        value: '10:00',
      })
    ).toBeFalsy();

    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        min: '10:00',
        value: '09:59',
      })
    ).toBeTruthy();
  });

  it('handles validation without a `value`', () => {
    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        max: '10:00',
        min: '10:00',
      })
    ).toBeFalsy();
  });

  it('handles validation without anything', () => {
    expect(getInputTimeMinMaxValidationMessagePolyfill({})).toBeFalsy();
  });
});
