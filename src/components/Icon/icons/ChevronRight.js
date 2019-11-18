import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ChevronRight = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="#677078" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

ChevronRight.propTypes = { fill: PropTypes.string };
ChevronRight.defaultProps = { fill: iconColorsMap.mainicon };

export default ChevronRight;
