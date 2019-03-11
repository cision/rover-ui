import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { tagPropType } from '../../shared/propTypes';

import style from './style.css';

const Button = props => {
  const {
    className: passedClassName,
    darkMode,
    level,
    size,
    tag: Tag,
    ...passedProps
  } = props;

  const className = classNames(
    passedClassName,
    style.Button,
    style[level],
    style[size],
    {
      [style.darkMode]: darkMode,
    }
  );

  return <Tag {...passedProps} className={className} />;
};

Button.propTypes = {
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
  tag: tagPropType,
  type: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  darkMode: false,
  level: 'secondary',
  size: 'lg',
  tag: 'button',
  type: 'button',
};

export default Button;
