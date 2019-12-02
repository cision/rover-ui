import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Drinks = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z" />
  </svg>
);
Drinks.propTypes = { fill: PropTypes.string };
Drinks.defaultProps = { fill: iconColorsMap.mainicon };

export default Drinks;
