import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ArrowDropUp = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M7 14l5-5 5 5z" />
  </svg>
);
ArrowDropUp.propTypes = { fill: PropTypes.string };
ArrowDropUp.defaultProps = { fill: iconColorsMap.mainicon };

export default ArrowDropUp;
