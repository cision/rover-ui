import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Warning = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);
Warning.propTypes = { fill: PropTypes.string };
Warning.defaultProps = { fill: iconColorsMap.mainicon };

export default Warning;
