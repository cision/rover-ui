import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Lightning = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M7 2v11h3v9l7-12h-4l3-8z" />
  </svg>
);
Lightning.propTypes = { fill: PropTypes.string };
Lightning.defaultProps = { fill: iconColorsMap.mainicon };

export default Lightning;
