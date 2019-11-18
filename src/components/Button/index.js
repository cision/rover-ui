import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { propTypes as tagPropTypes } from '../../shared/models/tag';

import Addon from './Addon';

import style from './style.css';

const Button = props => {
  const {
    active,
    children: initChildren,
    className: passedClassName,
    darkMode,
    level,
    size,
    tag: Tag,
    ...passedProps
  } = props;

  let children = initChildren;

  const className = classNames(
    passedClassName,
    style.Button,
    style[level],
    style[size],
    {
      [style.darkMode]: darkMode,
      [style.active]: active,
    }
  );

  const addonChildren = React.Children.toArray(initChildren).filter(
    child => child && child.type && child.type.displayName === Addon.displayName
  );

  if (addonChildren.length) {
    children = React.Children.map(initChildren, child => {
      if (child && child.type && child.type.displayName === Addon.displayName) {
        return React.cloneElement(child, { ...child.props, size });
      }

      if (typeof child === 'string') {
        return <span>{child}</span>;
      }

      return child;
    });
  }

  return (
    <Tag {...passedProps} className={className}>
      {children}
    </Tag>
  );
};

export const levels = [
  'primary',
  'secondary',
  'success',
  'teal',
  'tertiary',
  'link',
  'text',
];

export const states = [
  'checked',
  'active',
  'disabled',
  'hover',
  'focus',
];

export const sizes = ['sm', 'md', 'lg'];

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  level: PropTypes.oneOf(levels),
  size: PropTypes.oneOf(sizes),
  tag: tagPropTypes,
};

Button.defaultProps = {
  active: false,
  children: null,
  className: '',
  darkMode: false,
  level: 'secondary',
  size: 'lg',
  tag: 'button',
};

Button.Addon = Addon;

export default Button;
