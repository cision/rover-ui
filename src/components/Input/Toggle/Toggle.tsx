import React from 'react';

import classNames from 'classnames';

import type { InputProps } from '../Input';

import styles from './Toggle.module.css';

const Toggle: React.FC<InputProps> = ({
  checked = false,
  fauxDisabled = false,
  className = '',
  ...passedProps
}) => {
  const mainClass = classNames(styles.Toggle, className, {
    [styles.checked]: checked,
    [styles.disabled]: fauxDisabled,
  });

  return (
    <div role="checkbox" aria-checked={checked} className={mainClass}>
      <input
        type="checkbox"
        aria-hidden
        tabIndex={fauxDisabled ? -1 : undefined}
        checked={checked}
        {...passedProps}
        className={styles.input}
      />
      <span className={styles.notch} />
    </div>
  );
};

export default Toggle;
