const nullSafeMatch = (string: string, regExp: RegExp) => {
  const match = string.match(regExp);
  const content = match?.[0] ?? '';
  const index = match?.index ?? 0;
  const endIndex = content.length + index;
  return { content, index, endIndex };
};

type getDateOptions = {
  timeZoneOffset?: number | null;
};

interface GetTimeStringOptions extends Intl.DateTimeFormatOptions {
  formatTime?: Function;
  locale?: string;
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

export const getEndOfDay = (date: Date, options?: getDateOptions) => {
  const { timeZoneOffset } = options || {};
  const tzOffset = getTimeZoneOffsetFromLocal(timeZoneOffset);
  const endOfDay = new Date(date);
  endOfDay.setDate(endOfDay.getDate() + 1);
  endOfDay.setHours(0);
  endOfDay.setMinutes(0 - tzOffset);
  endOfDay.setSeconds(0);
  endOfDay.setMilliseconds(-1);
  return endOfDay;
};

export const getStartOfDay = (date: Date, options?: getDateOptions) => {
  const { timeZoneOffset } = options || {};
  const tzOffset = getTimeZoneOffsetFromLocal(timeZoneOffset);
  const startOfDay = new Date(date);
  startOfDay.setHours(0);
  startOfDay.setMinutes(0 - tzOffset);
  startOfDay.setSeconds(0);
  startOfDay.setMilliseconds(0);
  return startOfDay;
};

export const getShortTimeString = (hours: number, minutes: number) =>
  `${hours < 10 ? '0' : ''}${hours || 0}:${minutes < 10 ? '0' : ''}${
    minutes || 0
  }`;

export const getDateTimeFromShortTimeString = (
  value: string,
  options?: getDateOptions
) => {
  const { timeZoneOffset } = options || {};
  const tzOffset = getTimeZoneOffsetFromLocal(timeZoneOffset);
  const date = new Date();
  const [hours, minutes] = value.split(':');
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10) - tzOffset);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const getLocaleTimeStringFromShortTimeString = (
  value: string,
  options?: GetTimeStringOptions
) => {
  const { formatTime, locale, ...passedOptions } = options || {};

  return typeof formatTime === 'function'
    ? formatTime(getDateTimeFromShortTimeString(value))
    : getDateTimeFromShortTimeString(value).toLocaleTimeString(locale, {
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

  const time = getShortTimeString(hours, minutes);
  return hasValidUserInput ? { time, hours, minutes } : {};
};

const getTotalMinutes = (timeString?: string) => {
  const [hours, minutes] = (timeString || ':').split(':');
  const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  return !Number.isNaN(totalMinutes) ? totalMinutes : undefined;
};

export const getInputTimeMinMaxValidationMessagePolyfill = ({
  max,
  min,
  value,
}: {
  max?: string;
  min?: string;
  value?: string;
}) => {
  let validationMessage = '';
  const totalMinutes = getTotalMinutes(value || ':');
  const maxTotalMinutes = getTotalMinutes(max);
  const minTotalMinutes = getTotalMinutes(min);

  if (typeof totalMinutes !== 'number') {
    return validationMessage;
  }

  if (typeof maxTotalMinutes === 'number' && totalMinutes > maxTotalMinutes) {
    validationMessage = `Value must be ${max} or earlier.`;
  }

  if (typeof minTotalMinutes === 'number' && totalMinutes < minTotalMinutes) {
    validationMessage = `Value must be ${min} or later.`;
  }

  return validationMessage;
};
