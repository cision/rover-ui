
import React from 'react';
import classNames from 'classnames';

import styles from './Select.module.css';

interface SelectWithRefProps extends InputProps {
  fauxDisabled?: boolean;
  forwardedRef?: React.Ref<HTMLInputElement>;
}

const SelectWithRef: React.FC<SelectWithRefProps> = ({
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
      <div
        className={styles.select}
        ref={ref || undefined}
        tabIndex={fauxDisabled ? -1 : undefined}
        {...passedProps}
      >
      <div aria-hidden className={styles.svg} />
    </div>
  );
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => <SelectWithRef {...props} forwardedRef={ref || undefined} />
);

export default Select;
