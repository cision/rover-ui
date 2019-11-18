import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ArrowBack = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
  </svg>
);
ArrowBack.propTypes = { fill: PropTypes.string };
ArrowBack.defaultProps = { fill: iconColorsMap.mainicon };

export default ArrowBack;
