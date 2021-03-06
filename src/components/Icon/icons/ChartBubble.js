import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ChartBubble = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M14.8 16a2 2 0 110 4 2 2 0 010-4zm-7.6-4.8a3.2 3.2 0 110 6.4 3.2 3.2 0 010-6.4zm8-7.2a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6z" />
  </svg>
);
ChartBubble.propTypes = { fill: PropTypes.string };
ChartBubble.defaultProps = { fill: iconColorsMap.mainicon };

export default ChartBubble;
