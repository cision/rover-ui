import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.css';

const Addon = ({ className, size, ...passedProps }) => (
  <div
    {...passedProps}
    className={classNames(className, style.Addon, style[size])}
  />
);

Addon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
};

Addon.defaultProps = {
  className: '',
};

export default Addon;
