import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';
import { propTypes } from '../../shared/models/tag';

export const variants = [
  'dark',
  'danger',
  'notify',
  'warning',
  'info',
  'success',
  '',
];

const buildVariantClasses = (list, variant) =>
  list.reduce((acc, item) => {
    acc[styles[item]] = variant === item;
    return acc;
  }, {});

const Badge = ({ className, tag: Tag, round, variant, ...rest }) => {
  const classes = classNames(
    className,
    styles.Badge,
    { [styles.round]: round },
    buildVariantClasses(variants, variant)
  );

  return <Tag {...rest} className={classes} />;
};

Badge.defaultProps = {
  className: '',
  tag: 'span',
  round: false,
  variant: '',
};

Badge.propTypes = {
  className: PropTypes.string,
  tag: propTypes,
  round: PropTypes.bool,
  variant: PropTypes.oneOf(variants),
};

export default Badge;
