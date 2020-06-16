const nullSafeMatch = (string: string, regExp: RegExp) => {
  const match = string.match(regExp);
  const content = match?.[0] ?? '';
  const index = match?.index ?? 0;
  const endIndex = content.length + index;
  return { content, index, endIndex };
};

export const getShortTimeString = (hours: number, minutes: number) =>
  `${hours < 10 ? '0' : ''}${hours || 0}:${minutes < 10 ? '0' : ''}${
    minutes || 0
  }`;

export const getLocaleTimeStringFromShortTimeString = (value: string) => {
  const date = new Date();
  const [hours, minutes] = value.split(':');
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
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

    if (isPm) {
      hours += 12;
      hours %= 24;
    }

    hasValidUserInput = true;
  }

  const time = getShortTimeString(hours, minutes);
  return hasValidUserInput ? { time, hours, minutes } : {};
};
