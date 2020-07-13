const nullSafeMatch = (string: string, regExp: RegExp) => {
  const match = string.match(regExp);
  const content = match?.[0] ?? '';
  const index = match?.index ?? 0;
  const endIndex = content.length + index;
  return { content, index, endIndex };
};

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

export const getEndOfDay = (date: Date) => {
  const endOfDay = new Date(date);
  endOfDay.setDate(endOfDay.getDate() + 1);
  endOfDay.setHours(0);
  endOfDay.setMinutes(0);
  endOfDay.setSeconds(0);
  endOfDay.setMilliseconds(-1);
  return endOfDay;
};

export const getStartOfDay = (date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0);
  startOfDay.setMinutes(0);
  startOfDay.setSeconds(0);
  startOfDay.setMilliseconds(0);
  return startOfDay;
};

export const getShortTimeString = (hours: number, minutes: number) =>
  `${hours < 10 ? '0' : ''}${hours || 0}:${minutes < 10 ? '0' : ''}${
    minutes || 0
  }`;

export const getDateTimeFromShortTimeString = (value: string) => {
  const date = new Date();
  const [hours, minutes] = value.split(':');
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const getLocaleTimeStringFromShortTimeString = (
  value: string,
  { formatTime }
) =>
  typeof formatTime === 'function'
    ? formatTime(getDateTimeFromShortTimeString(value))
    : getDateTimeFromShortTimeString(value).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      });

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
