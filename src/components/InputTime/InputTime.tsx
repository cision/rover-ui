import React, { forwardRef } from 'react';

import { InputProps } from '../Input';
import InputTimeAsDate from './AsDate';
import InputTimeAsString from './AsString';

/*
Desired features:
- Add an optional dropdown that lets the user select a time quickly
- Add min/max support for both raw times datetimes (less than 10AM June 9)
- Add configurable steps for hour/minute/30/15/5 minutes/auto
*/

interface InputTimeProps extends Omit<InputProps, 'value' | 'max' | 'min'> {
  max?: string;
  min?: string;
  value?: string;
}

export const InputTime: React.FC<InputTimeProps> = ({
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

export default forwardRef<HTMLInputElement, InputTimeProps>((props, ref) => (
  <InputTime {...props} forwardedRef={ref || undefined} />
));
