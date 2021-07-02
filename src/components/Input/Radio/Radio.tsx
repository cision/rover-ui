import React from 'react';

import classNames from 'classnames';

import type { InputProps } from '../Input';

import RadioSvg from './RadioSvg';
import styles from './Radio.module.css';

interface RadioWithRefProps extends InputProps {
  forwardedRef?: React.Ref<HTMLInputElement>;
}

const RadioWithRef: React.FC<RadioWithRefProps> = ({
  checked = false,
  className = '',
  forwardedRef: ref,
  ...passedProps
}) => {
  return (
    <div
      className={classNames(styles.Radio, className, {
        [styles.checked]: checked,
      })}
    >
      <input
        checked={checked}
        className={styles.input}
        ref={ref || undefined}
        type="radio"
        {...passedProps}
      />
      <RadioSvg aria-hidden className={styles.svg} />
    </div>
  );
};

const Radio = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <RadioWithRef {...props} forwardedRef={ref || undefined} />
));

export default Radio;
