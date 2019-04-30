import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, fontFamily, fontSize, lineHeight, space } from 'styled-system';

const StyledBadge = styled.span`
  border-radius: 2px;
  display: inline-block;

  ${lineHeight}
  ${color}
  ${fontFamily}
  ${fontSize}
  ${space}
`;

const Badge = ({ variant, ...props }) => {
  if (variant === 'danger') {
    return <StyledBadge {...props} color="white" bg="danger" />;
  } else if (variant === 'notify') {
    return <StyledBadge {...props} color="white" bg="notify" />;
  } else if (variant === 'info') {
    return <StyledBadge {...props} color="white" bg="info" />;
  } else if (variant === 'success') {
    return <StyledBadge {...props} color="white" bg="success" />;
  } else if (variant === 'dark') {
    return <StyledBadge {...props} color="white" bg="rgba(0, 0, 0, 0.2)" />;
  } else if (variant === 'warning') {
    return <StyledBadge {...props} bg="warning" />;
  }

  return <StyledBadge {...props} />;
};

Badge.defaultProps = {
  alignment: '',
  variant: '',
  color: 'grayLite.0',
  fontFamily: 'body',
  fontSize: 0,
  lineHeight: 1.5,
  py: 0,
  px: '0.5em',
  ml: 0,
  mr: 0,
};

Badge.propTypes = {
  variant: PropTypes.oneOf([
    'dark',
    'danger',
    'notify',
    'warning',
    'info',
    'success',
    '',
  ]),
  ...color.propTypes,
  ...fontFamily.propTypes,
  ...fontSize.propTypes,
  ...space.propTypes,
};

export default Badge;
