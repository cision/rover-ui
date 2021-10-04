import React from 'react';

import classNames from 'classnames';

import type { InputProps } from '../Input';

import styles from './Toggle.module.css';

interface ToggleWithRefProps extends InputProps {
  fauxDisabled?: boolean;
  forwardedRef?: React.Ref<HTMLInputElement>;
}

const ToggleWithRef: React.FC<ToggleWithRefProps> = ({
  checked = false,
  fauxDisabled = false,
  forwardedRef: ref,
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
        ref={ref || undefined}
        {...passedProps}
        className={styles.input}
      />
      <span className={styles.notch} />
    </div>
  );
};

const Toggle = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <ToggleWithRef {...props} forwardedRef={ref || undefined} />
));

export default Toggle;
