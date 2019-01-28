import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';

import StyledBadge from './styled.js';

const Badge = ({ variant, bg, ...props }) => {
  let background = bg || variant;
  let { color: badgeColor } = props;

  if (variant === 'dark') {
    background = 'rgba(0, 0, 0, 0.2)';
  }

  if (!includes(['warning', ''], variant)) {
    badgeColor = 'white';
  }

  const defaultProps = {
    ...props,
    bg: background,
    color: badgeColor,
  };

  return <StyledBadge {...defaultProps} />;
};

export const variants = [
  'dark',
  'danger',
  'notify',
  'warning',
  'info',
  'success',
  '',
];

Badge.defaultProps = {
  bg: null,
  color: null,
  variant: '',
};

Badge.propTypes = {
  bg: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(variants),
};

export default Badge;
