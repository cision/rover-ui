import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const SortDesc = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
  </svg>
);
SortDesc.propTypes = { fill: PropTypes.string };
SortDesc.defaultProps = { fill: iconColorsMap.mainicon };

export default SortDesc;
