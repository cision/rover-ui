import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.css';

const Paper = ({ dark, padding, className, ...passprops }) => {
  const classes = classNames(style.Paper, style[padding], {
    [className]: !!className,
    [style.dark]: dark,
  });

  return <div {...passprops} className={classes} />;
};

Paper.defaultProps = {
  children: null,
  className: '',
  dark: false,
  padding: 'md',
};

Paper.propTypes = {
  children: PropTypes.node,
  /*
   * Additional classes to apply to the wrapping Paper class
   */
  className: PropTypes.string,
  dark: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
};

export default Paper;
