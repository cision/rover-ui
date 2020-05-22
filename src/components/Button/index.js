import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { propTypes as tagPropTypes } from '../../shared/models/tag';

import Addon from './Addon';
import styles from './Button.module.css';

/*
  These 2 variants are in design docs but might not be "Buttons" in a strict sense.
  Filter (-> Should probably be a pill)
  Select (-> These might be better served as a different component)
*/

// Design doc names in comments
export const levels = [
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
export const states = [
  'hover', // "Hover"
  'focus', // "Focus"
  'active', // "Pressed"
  'disabled', // "Disabled"
  'checked', // "Active"
];

export const sizes = [
  'sm', // ""
  'md', // "Medium"
  'lg', // "Large"
];

const Button = (props) => {
  const {
    children: initChildren,
    circle,
    className: passedClassName,
    darkMode,
    hollow,
    level,
    size,
    tag: Tag,
    ...passedProps
  } = props;

  let children = initChildren;

  // For future ref
  const truthyStateKeys = useMemo(
    () => states.filter((state) => !!passedProps[state]),
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
        truthyStateKeys.map((truthyStateKey) => styles[truthyStateKey])
      ),
    [circle, darkMode, hollow, level, passedClassName, size, truthyStateKeys]
  );

  const addonChildren = React.Children.toArray(initChildren).filter(
    (child) =>
      child && child.type && child.type.displayName === Addon.displayName
  );

  if (addonChildren.length) {
    children = React.Children.map(initChildren, (child) => {
      if (child && child.type && child.type.displayName === Addon.displayName) {
        return React.cloneElement(child, { ...child.props, size });
      }

      if (typeof child === 'string') {
        return <span className={styles.buttonBody}>{child}</span>;
      }

      return child;
    });
  }

  return (
    <Tag {...safePassedProps} className={className}>
      {children}
    </Tag>
  );
};

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  /** `circle` buttons have a fixed width === height */
  circle: PropTypes.bool,
  className: PropTypes.string,
  /** `darkMode` is deprecated in favor of `hollow` */
  darkMode: PropTypes.bool,
  /** `hollow` buttons have an outline style, and are suitable for dark backgrounds */
  hollow: PropTypes.bool,
  level: PropTypes.oneOf(levels),
  size: PropTypes.oneOf(sizes),
  tag: tagPropTypes,
  ...states.reduce(
    (result, stateKey) => ({
      ...result,
      [stateKey]: PropTypes.bool,
    }),
    {}
  ),
};

Button.defaultProps = {
  active: false,
  children: null,
  circle: undefined,
  className: '',
  darkMode: false,
  hollow: false,
  level: 'secondary',
  size: 'lg',
  tag: 'button',
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
