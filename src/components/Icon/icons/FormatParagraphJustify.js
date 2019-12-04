import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const FormatParagraphJustify = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" />
  </svg>
);
FormatParagraphJustify.propTypes = { fill: PropTypes.string };
FormatParagraphJustify.defaultProps = { fill: iconColorsMap.mainicon };

export default FormatParagraphJustify;
