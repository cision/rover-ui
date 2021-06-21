import React, { forwardRef } from 'react';

import classNames from 'classnames';

import Icon from '../../Icon';
import inputStyles from '../../Input/Input.module.css';
import styles from './Toggle.module.css';

interface ToggleProps extends React.HTMLProps<HTMLButtonElement> {
  isDisabled: boolean;
  isOpen: boolean;
  isPlaceholder: boolean;
  label: string;
  forwardedRef?: React.Ref<HTMLButtonElement>;
}

const Toggle = ({
  className = '',
  isDisabled = false,
  isOpen = false,
  isPlaceholder = false,
  label = '',
  forwardedRef = undefined,
  ...passedProps
}: ToggleProps) => (
  <button
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    className={classNames(inputStyles.Input, styles.Toggle, className, {
      [inputStyles.disabled]: isDisabled,
      [styles.placeholder]: isPlaceholder,
    })}
    ref={forwardedRef}
    {...passedProps}
    disabled={isDisabled}
    type="button"
  >
    <span className={styles.label}>{label}</span>
    <Icon className={styles.icon} name="arrow-drop-down" />
  </button>
);

export default forwardRef<HTMLButtonElement, ToggleProps>((props, ref) => (
  <Toggle {...props} forwardedRef={ref} />
));
