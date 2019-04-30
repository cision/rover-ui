import React from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import styled from 'styled-components';
import {
  color,
  fontFamily,
  fontSize,
  marginLeft,
  marginRight,
} from 'styled-system';

const StyledBadge = styled.span`
  border-radius: 2px;
  display: inline-block;
  line-height: 1.5;
  padding: 0 0.5em;

  ${color}
  ${fontFamily}
  ${fontSize}
  ${marginLeft}
  ${marginRight}
`;

const Badge = ({ variant, ...props }) => {
  let bg = variant;

  const passprops = {
    ...props,
    bg: variant,
    color: includes(['warning', ''], variant) ? props.color : 'white',
  };

  if (variant === 'dark') {
    bg = 'rgba(0, 0, 0, 0.2)';
  }

  return <StyledBadge {...passprops} bg={bg} />;
};

Badge.defaultProps = {
  alignment: '',
  variant: '',
  color: 'grayLite.0',
  fontFamily: 'body',
  fontSize: 0,
  ml: 0,
  mr: 0,
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

Badge.propTypes = {
  variant: PropTypes.oneOf(variants),
  ...color.propTypes,
  ...fontFamily.propTypes,
  ...fontSize.propTypes,
  ...marginLeft.propTypes,
  ...marginRight.propTypes,
};

export default Badge;
