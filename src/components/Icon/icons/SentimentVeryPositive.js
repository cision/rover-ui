import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const SentimentVeryPositive = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6h10c-.78 2.34-2.72 4-5 4-2.204 0-4.09-1.551-4.918-3.768L7 14h10zm8.5-6a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-7 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
  </svg>
);
SentimentVeryPositive.propTypes = { fill: PropTypes.string };
SentimentVeryPositive.defaultProps = { fill: iconColorsMap.mainicon };

export default SentimentVeryPositive;
