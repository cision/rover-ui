import React, { forwardRef, Ref } from 'react';

import classNames from 'classnames';

import Checkbox from './Checkbox';

import styles from './Input.module.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Applies disabled appearance without disabling. Helpful for adding tooltips on disabled field clicks. */
  fauxDisabled?: boolean;
  forwardedRef?: Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  className = '',
  onChange = () => {},
  fauxDisabled = false,
  forwardedRef: ref,
  type = '',
  ...passedProps
}) => {
  if (type.toLowerCase() === 'checkbox') {
    return (
      <Checkbox ref={ref || undefined} onChange={onChange} {...passedProps} />
    );
  }

  return (
    <input
      className={classNames(styles.Input, className, {
        [styles.disabled]: fauxDisabled,
      })}
      ref={ref || undefined}
      onChange={onChange}
      type={type}
      {...passedProps}
    />
  );
};

export default forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <Input {...props} forwardedRef={ref || undefined} />
));
