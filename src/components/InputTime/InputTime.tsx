import React, { forwardRef } from 'react';

import InputTimeAsDate from './AsDate';
import InputTimeAsString, { AsStringProps } from './AsString';

/*
Desired features:
- Add an optional dropdown that lets the user select a time quickly
-- Needs to center selection on current
-- Needs width tweaks
- Add min/max support for both raw times datetimes (less than 10AM June 9)
- Add configurable steps for hour/minute/30/15/5 minutes/auto
-- Configurable steps should be enforced on selections
-- Auto steps should be enforced for dropdown options only
*/

export const InputTime: React.FC<AsStringProps> = ({
  max,
  min,
  value,
  ...passedProps
}) => {
  const maxDate = max ? new Date(max) : undefined;
  const minDate = min ? new Date(min) : undefined;
  const valueDate = value ? new Date(value) : undefined;

  if (valueDate && !Number.isNaN(valueDate.valueOf())) {
    return (
      <InputTimeAsDate
        {...passedProps}
        max={maxDate?.toISOString() ?? undefined}
        min={minDate?.toISOString() ?? undefined}
        value={valueDate?.toISOString() ?? undefined}
      />
    );
  }

  return (
    <InputTimeAsString {...passedProps} max={max} min={min} value={value} />
  );
};

export default forwardRef<HTMLInputElement, AsStringProps>((props, ref) => (
  <InputTime {...props} forwardedRef={ref || undefined} />
));
