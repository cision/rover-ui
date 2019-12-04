import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const FormatItalic = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
  </svg>
);
FormatItalic.propTypes = { fill: PropTypes.string };
FormatItalic.defaultProps = { fill: iconColorsMap.mainicon };

export default FormatItalic;
