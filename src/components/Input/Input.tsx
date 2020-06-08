import React from 'react';
import classNames from 'classnames';

import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Applies disabled appearance without disabling. Helpful for adding tooltips on disabled field clicks. */
  fauxDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  className = '',
  onChange = () => {},
  readOnly = false,
  fauxDisabled = false,
  ...passedProps
}) => {
  return (
    <input
      className={classNames(styles.Input, className, {
        [styles.disabled]: fauxDisabled,
      })}
      readOnly={readOnly}
      onChange={onChange}
      {...passedProps}
    />
  );
};

export default Input;
