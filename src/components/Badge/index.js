import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.css';

const hasModifier = (modifiers, key) => {
  return Array.isArray(modifiers) && modifiers.includes(key);
};

const Badge = ({ className, modifiers, ...passprops }) => {
  const classes = classNames(styles.Badge, {
    className: !!className,
    [styles.dark]: hasModifier(modifiers, 'dark'),
    [styles.light]: hasModifier(modifiers, 'light'),
    [styles.danger]: hasModifier(modifiers, 'danger'),
    [styles.notify]: hasModifier(modifiers, 'notify'),
    [styles.warning]: hasModifier(modifiers, 'warning'),
    [styles.info]: hasModifier(modifiers, 'info'),
    [styles.success]: hasModifier(modifiers, 'success'),
    [styles.right]: hasModifier(modifiers, 'right'),
    [styles.left]: hasModifier(modifiers, 'left'),
  });

  return <div {...passprops} className={classes} />;
};

Badge.defaultProps = {
  children: null,
  className: '',
  modifiers: [],
  style: {},
};

Badge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  modifiers: PropTypes.array,
  style: PropTypes.object,
};

export default Badge;
