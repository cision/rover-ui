import React, { forwardRef, Ref } from 'react';
import classNames from 'classnames';

import styles from './Input.module.css';

type InputRefType = HTMLInputElement;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Applies disabled appearance without disabling. Helpful for adding tooltips on disabled field clicks. */
  fauxDisabled?: boolean;
  forwardedRef?: Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  className = '',
  onChange = () => {},
  readOnly = false,
  fauxDisabled = false,
  forwardedRef: ref,
  ...passedProps
}) => {
  return (
    <input
      className={classNames(styles.Input, className, {
        [styles.disabled]: fauxDisabled,
      })}
      readOnly={readOnly}
      ref={ref}
      onChange={onChange}
      {...passedProps}
    />
  );
};

export default forwardRef<InputRefType, InputProps>((props, ref) => (
  <Input {...props} forwardedRef={ref} />
));
