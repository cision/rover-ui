import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ArrowDown = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8z" />
  </svg>
);
ArrowDown.propTypes = { fill: PropTypes.string };
ArrowDown.defaultProps = { fill: iconColorsMap.mainicon };

export default ArrowDown;
