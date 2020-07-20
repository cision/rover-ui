const nullSafeMatch = (string: string, regExp: RegExp) => {
  const match = string.match(regExp);
  const content = match?.[0] ?? '';
  const index = match?.index ?? 0;
  const endIndex = content.length + index;
  return { content, index, endIndex };
};

type DateOptions = {
  timeZoneOffset?: number | null;
};

interface TimeStringOptions extends Intl.DateTimeFormatOptions {
  formatTime?: Function;
  locale?: string;
  timeZoneOffset?: number | null;
}

export const handleDispatchNativeInputChange = (
  element: HTMLInputElement,
  nextValue: string | Date
) => {
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
    nativeInputValueSetter.call(element, nextValue);
    const passedEvent = new Event('input', { bubbles: true });
    element.dispatchEvent(passedEvent);
  }
};

// Without a timezone offset, use local dates.
// With a time zone offset, compensate for local time and desired time zones.
const getTimeZoneOffsetFromLocal = (targetMinusUtc?: number | null) => {
  if (typeof targetMinusUtc !== 'number') {
    return 0;
  }

  const utcMinusLocal = new Date().getTimezoneOffset();
  return targetMinusUtc + utcMinusLocal;
};

export const getStartOfDay = (date: Date, options?: DateOptions) => {
  const { timeZoneOffset } = options || {};
  const tzOffset = getTimeZoneOffsetFromLocal(timeZoneOffset);
  const startOfDay = new Date(date);
  startOfDay.setMinutes(startOfDay.getMinutes() + tzOffset);
  startOfDay.setHours(0);
  startOfDay.setMinutes(0);
  startOfDay.setSeconds(0);
  startOfDay.setMilliseconds(0);
  startOfDay.setMinutes(startOfDay.getMinutes() - tzOffset);
  return startOfDay;
};

export const getEndOfDay = (date: Date, options?: DateOptions) => {
  const endOfDay = getStartOfDay(date, options);
  endOfDay.setDate(endOfDay.getDate() + 1);
  endOfDay.setMilliseconds(-1);
  return endOfDay;
};

interface GetShortTimeStringArgs extends DateOptions {
  hours?: number;
  minutes?: number;
  date?: Date;
}

export const getShortTimeString = (args?: GetShortTimeStringArgs) => {
  const {
    hours: passedHours,
    minutes: passedMinutes,
    date: passedDate,
    timeZoneOffset,
  } = args || {};

  let hours = passedHours || 0;
  let minutes = passedMinutes || 0;
  const date = passedDate && new Date(passedDate);
  const tzOffset = getTimeZoneOffsetFromLocal(timeZoneOffset);

  if (date) {
    date.setMinutes(date.getMinutes() + tzOffset);
    hours = date.getHours();
    minutes = date.getMinutes();
  }

  return `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
};

export const getDateTimeFromShortTimeString = (
  value: string,
  options?: DateOptions
) => {
  const { timeZoneOffset } = options || {};
  const tzOffset = getTimeZoneOffsetFromLocal(timeZoneOffset);
  const date = new Date();
  const [hours, minutes] = value.split(':');
  date.setMinutes(date.getMinutes() + tzOffset);
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10) - tzOffset);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const getLocaleTimeStringFromShortTimeString = (
  value: string,
  options?: TimeStringOptions
) => {
  const { formatTime, locale, timeZoneOffset, ...passedOptions } =
    options || {};

  const date = getDateTimeFromShortTimeString(value, {
    timeZoneOffset,
  });

  return typeof formatTime === 'function'
    ? formatTime(date)
    : date.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: '2-digit',
        ...passedOptions,
      });
};

export const guessTimeFromString = (string: string) => {
  const invalidChars = new RegExp('[^\\d:\\spam.]', 'gi');
  const numberRegExp = new RegExp('\\d+');
  let hours = 0;
  let minutes = 0;
  let isPm = false;
  let hasValidUserInput = false;
  let value = string.replace(invalidChars, ' ');

  // Get hours from fuzzy string
  let { content, endIndex } = nullSafeMatch(value, numberRegExp);

  if (content && parseInt(content, 10) < 24) {
    hours = parseInt(content, 10);
    isPm = hours >= 12;
    value = value.substring(endIndex);
    hasValidUserInput = true;
  }

  // Get minutes from fuzzy string
  ({ content, endIndex } = nullSafeMatch(value, numberRegExp));

  if (content && parseInt(content, 10) < 60) {
    minutes = parseInt(content, 10);
    value = value.substring(endIndex);
    hasValidUserInput = true;
  }

  // Get am/pm from fuzzy string
  const amPmRegExp = new RegExp('[ap]', 'i');
  ({ content } = nullSafeMatch(value, amPmRegExp));

  if (content && hours > 0 && hours <= 12) {
    isPm = (content || '').toLowerCase() === 'p';
    hours %= 12;

    if (isPm) {
      hours += 12;
    }

    hasValidUserInput = true;
  }

  const time = getShortTimeString({ hours, minutes });
  return hasValidUserInput ? { time, hours, minutes } : {};
};
