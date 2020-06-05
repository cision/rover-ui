import React from 'react';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

import styles from './Input.module.css';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  className?: ClassValue;
  /** Applies disabled appearance without disabling. Helpful for adding tooltips on disabled field clicks. */
  fauxDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  className = '',
  fauxDisabled = false,
  ...passedProps
}) => {
  return (
    <input
      className={classNames(styles.Input, className, {
        [styles.disabled]: fauxDisabled,
      })}
      {...passedProps}
    />
  );
};

export default Input;
