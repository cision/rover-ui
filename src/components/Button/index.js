import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { propTypes as tagPropTypes } from '../../shared/models/tag';

import Addon from './Addon';

import style from './style.css';

const Button = props => {
  const {
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
    }
  );

  const addonChildren = React.Children.toArray(initChildren).filter(
    child => child.type && child.type.name === Addon.name
  );

  if (addonChildren.length) {
    children = React.Children.map(initChildren, child => {
      if (child.type && child.type.name === Addon.name) {
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

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  level: PropTypes.oneOf([
    'primary',
    'teal',
    'secondary',
    'success',
    'tertiary',
    'teal',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  tag: tagPropTypes,
  type: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  className: '',
  darkMode: false,
  level: 'secondary',
  size: 'lg',
  tag: 'button',
  type: 'button',
};

Button.Addon = Addon;

export default Button;
