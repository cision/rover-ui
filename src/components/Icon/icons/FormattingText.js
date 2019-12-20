import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const FormattingText = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z" />
  </svg>
);
FormattingText.propTypes = { fill: PropTypes.string };
FormattingText.defaultProps = { fill: iconColorsMap.mainicon };

export default FormattingText;
