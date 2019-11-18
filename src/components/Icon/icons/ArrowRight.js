import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ArrowRight = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M10 17l5-5-5-5z" />
  </svg>
);
ArrowRight.propTypes = { fill: PropTypes.string };
ArrowRight.defaultProps = { fill: iconColorsMap.mainicon };

export default ArrowRight;
