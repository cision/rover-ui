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

  describe.skip('with optional `timeZoneOffset`', () => {
    it('works for different time zones', () => {
      // Result is cast to UTC, using UTC input, timeZoneOffset for EOD
      const date = new Date('2020-07-20T12:30');
      const endOfDayTimeString = '11:59:59 PM';
      let timeZoneOffset: number;

      // Central Daylight Time
      timeZoneOffset = -300; // -5:00
      const endOfDayCDT = getEndOfDay(date, { timeZoneOffset });

      const formattedTimeCDT = getFormattedTimeWithTimeZone({
        date: endOfDayCDT,
        timeZoneName: 'America/Chicago',
      });

      // India Standard Time
      timeZoneOffset = 330; // +5:30
      const endOfDayIST = getEndOfDay(date, { timeZoneOffset });

      const formattedTimeIST = getFormattedTimeWithTimeZone({
        date: endOfDayIST,
        timeZoneName: 'Asia/Calcutta',
      });

      expect(formattedTimeCDT).toEqual(endOfDayTimeString);
      expect(formattedTimeIST).toEqual(endOfDayTimeString);
      expect(endOfDayCDT.toISOString()).not.toEqual(endOfDayIST.toISOString());
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

  describe.skip('with optional `timeZoneOffset`', () => {
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
    expect(getShortTimeString(12, 30)).toEqual('12:30');
  });

  it('pads single digit numbers with "0"', () => {
    expect(getShortTimeString(9, 1)).toEqual('09:01');
  });

  it('handles zeroes', () => {
    expect(getShortTimeString(0, 0)).toEqual('00:00');
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

  describe.skip('with optional `timeZoneOffset`', () => {
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
          time: getShortTimeString(expected.hours, expected.minutes),
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

  it('handles validation with `max` "00:00"', () => {
    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        max: '00:00',
        value: '00:00',
      })
    ).toBeFalsy();

    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        max: '00:00',
        value: '00:01',
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

  it('handles validation with `value` undefined', () => {
    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        max: '10:00',
        min: '10:00',
      })
    ).toBeFalsy();
  });

  it('handles validation with `value` "00:00"', () => {
    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        min: '00:01',
        value: '00:00',
      })
    ).toBeTruthy();

    expect(
      getInputTimeMinMaxValidationMessagePolyfill({
        min: '00:00',
        value: '00:00',
      })
    ).toBeFalsy();
  });

  it('handles validation without anything', () => {
    expect(getInputTimeMinMaxValidationMessagePolyfill({})).toBeFalsy();
  });
});
