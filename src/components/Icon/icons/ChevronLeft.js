import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ChevronLeft = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

ChevronLeft.propTypes = { fill: PropTypes.string };
ChevronLeft.defaultProps = { fill: iconColorsMap.mainicon };

export default ChevronLeft;
