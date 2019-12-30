import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Hamburger = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);
Hamburger.propTypes = { fill: PropTypes.string };
Hamburger.defaultProps = { fill: iconColorsMap.mainicon };

export default Hamburger;
