import React from 'react';

import classNames from 'classnames';

import type { InputProps } from '../Input';

import CheckboxSvg from './CheckboxSvg';
import styles from './Checkbox.module.css';

interface CheckboxWithRefProps extends InputProps {
  forwardedRef?: React.Ref<HTMLInputElement>;
}

const CheckboxWithRef: React.FC<CheckboxWithRefProps> = ({
  forwardedRef: ref,
  checked = false,
  className = '',
  ...passedProps
}) => {
  return (
    <div className={className}>
      <CheckboxSvg
        className={classNames(styles.svg, {
          [styles.checked]: checked,
        })}
      />
      <input
        {...passedProps}
        checked={checked}
        className={styles.input}
        ref={ref || undefined}
        type="checkbox"
      />
    </div>
  );
};

const Checkbox = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <CheckboxWithRef {...props} forwardedRef={ref || undefined} />
);

export default Checkbox;
