import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Addon, { AddonProps } from './Addon/Addon';
import styles from './Button.module.css';

/*
  These 2 variants are in design docs but might not be "Buttons" in a strict sense.
  Filter (-> Should probably be a pill)
  Select (-> These might be better served as a different component)
*/

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonState = 'hover' | 'focus' | 'active' | 'disabled' | 'checked';
type ButtonLevel =
  | 'primary'
  | 'primary-alt'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'danger'
  | 'link'
  | 'teal'
  | 'text';

interface ButtonProps {
  circle?: boolean;
  className?: string;
  darkMode?: boolean;
  hollow?: boolean;
  level?: ButtonLevel;
  onClick?: () => void;
  size?: ButtonSize;
  tag?: keyof JSX.IntrinsicElements;

  // States
  hover?: boolean;
  active?: boolean;
  disabled?: boolean;
  checked?: boolean;
  focus?: boolean;
}

type ButtonType = React.FC<ButtonProps> & {
  Addon: React.FC<AddonProps>;
};

// Design doc names in comments
export const levels: ButtonLevel[] = [
  'primary', // "Primary"
  'primary-alt', // "Teal"
  'secondary', // "Secondary"
  'tertiary', // "Tertiary"
  'success', // "Green"
  'danger', // "Red"
  'link', // "Blue"
  'text', // "Gray"
];

// These states are each their own boolean prop
export const states: ButtonState[] = [
  'hover', // "Hover"
  'focus', // "Focus"
  'active', // "Pressed"
  'disabled', // "Disabled"
  'checked', // "Active"
];

export const sizes: ButtonSize[] = [
  'sm', // ""
  'md', // "Medium"
  'lg', // "Large"
];

const Button: ButtonType = ({
  children: initChildren = null,
  circle = undefined,
  className: passedClassName = '',
  onClick = () => {},
  darkMode = false,
  hollow = false,
  level = 'secondary',
  size = 'lg',
  tag: Tag = 'button',
  ...passedProps
}) => {
  let children = initChildren;

  // For future ref
  const truthyStateKeys = useMemo(
    () => states.filter(state => !!passedProps[state]),
    [passedProps]
  );

  // Filter out undefined passedProps and `active` from DOM element tags
  const safePassedProps = useMemo(
    () =>
      Object.entries(passedProps).reduce((result, [key, value]) => {
        if (value === undefined) {
          return result;
        }

        if (typeof Tag === 'string' && key === 'active') {
          return result;
        }

        return { ...result, [key]: value };
      }, {}),
    [passedProps, Tag]
  );

  const className = useMemo(
    () =>
      classNames(
        passedClassName,
        styles.Button,
        styles[level],
        styles[size],
        {
          [styles.hollow]: hollow || darkMode,
          [styles.circle]: circle,
          [styles['primary-alt']]: level === 'teal', // For backwards compatibility with the old level name
        },
        /*
          In addition to "real" boolean props, this adds class names for
          'disabled', 'active', etc. so consumers can force appearance on
          elements easily
        */
        truthyStateKeys.map(truthyStateKey => styles[truthyStateKey])
      ),
    [circle, darkMode, hollow, level, passedClassName, size, truthyStateKeys]
  );

  const addonChildren = React.Children.toArray(initChildren).filter(child => {
    const c = child as React.ReactElement & { type: { displayName?: string } };
    return c?.type?.displayName === Addon.displayName;
  });

  if (addonChildren.length) {
    children = React.Children.map(initChildren, child => {
      const c = child as React.ReactElement & {
        type: { displayName?: string };
      };

      if (c?.type?.displayName === Addon.displayName) {
        return React.cloneElement(child as React.ReactElement, {
          ...((child as React.ReactElement)?.props || {}),
          size,
        });
      }

      if (typeof child === 'string') {
        return <span className={styles.buttonBody}>{child}</span>;
      }

      return child;
    });
  }

  return (
    <Tag {...safePassedProps} onClick={onClick} className={className}>
      {children}
    </Tag>
  );
};

Button.propTypes = {
  active: PropTypes.bool,
  /** `circle` buttons have a fixed width === height */
  circle: PropTypes.bool,
  className: PropTypes.string,
  /** `darkMode` is deprecated in favor of `hollow` */
  darkMode: PropTypes.bool,
  /** `hollow` buttons have an outline style, and are suitable for dark backgrounds */
  hollow: PropTypes.bool,
  level: PropTypes.oneOf(levels),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(sizes),
  ...states.reduce(
    (result, stateKey) => ({
      ...result,
      [stateKey]: PropTypes.bool,
    }),
    {}
  ),
};

Button.defaultProps = {
  active: undefined,
  circle: false,
  className: '',
  darkMode: false,
  hollow: false,
  level: 'secondary',
  onClick: () => {},
  size: 'lg',
  ...states.reduce(
    (result, stateKey) => ({
      ...result,
      [stateKey]: undefined,
    }),
    {}
  ),
};

Button.Addon = Addon;

export default Button;
