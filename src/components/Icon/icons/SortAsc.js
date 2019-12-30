import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const SortAsc = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M3 8h6V6H3v2zm0 8v2h18v-2H3zm0-3h12v-2H3v2z" />
  </svg>
);
SortAsc.propTypes = { fill: PropTypes.string };
SortAsc.defaultProps = { fill: iconColorsMap.mainicon };

export default SortAsc;
