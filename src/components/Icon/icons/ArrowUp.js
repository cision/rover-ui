import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ArrowUp = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z" />
  </svg>
);
ArrowUp.propTypes = { fill: PropTypes.string };
ArrowUp.defaultProps = { fill: iconColorsMap.mainicon };

export default ArrowUp;
