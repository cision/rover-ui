import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

import styles from './Input.module.css';

interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  className?: ClassValue;
  isError?: boolean;
}

export const Input: React.FC<FormInputProps> = ({
  className: klassName = '',
  isError = false,
  autoFocus = false,
  ...props
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
    }
  });

  const className = classNames(
    styles.Input,
    {
      [styles.error]: isError,
    },
    klassName
  );

  return <input {...props} ref={ref} className={className} />;
};

export default Input;
