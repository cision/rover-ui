import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const Badge = ({ className, darkMode, color, ...passprops }) => {
  const classes = classNames(styles.Badge, {
    className: !!className,
    [styles[color]]: !!color && !darkMode,
    [styles.dark]: darkMode,
  });

  return <div {...passprops} className={classes} />;
};

Badge.defaultProps = {
  alignment: '',
  children: null,
  className: '',
  darkMode: false,
  color: '',
  style: {},
};

Badge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(['danger', 'notify', 'warning', 'info', 'success']),
  darkMode: PropTypes.boolean,
  style: PropTypes.object,
};

export default Badge;
