import React from 'react';

import classNames from 'classnames';

import type { InputProps } from '../Input';

import CheckboxSvg from './CheckboxSvg';
import styles from './Checkbox.module.css';

interface CheckboxWithRefProps extends InputProps {
  fauxDisabled?: boolean;
  forwardedRef?: React.Ref<HTMLInputElement>;
}

const CheckboxWithRef: React.FC<CheckboxWithRefProps> = ({
  checked = false,
  className = '',
  fauxDisabled = false,
  forwardedRef: ref,
  ...passedProps
}) => {
  return (
    <div
      className={classNames(styles.Checkbox, className, {
        [styles.checked]: checked,
        [styles.disabled]: fauxDisabled,
      })}
    >
      <input
        checked={checked}
        className={styles.input}
        ref={ref || undefined}
        tabIndex={fauxDisabled ? -1 : undefined}
        type="checkbox"
        {...passedProps}
      />
      <CheckboxSvg aria-hidden className={styles.svg} />
    </div>
  );
};

const Checkbox = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <CheckboxWithRef {...props} forwardedRef={ref || undefined} />
);

export default Checkbox;
