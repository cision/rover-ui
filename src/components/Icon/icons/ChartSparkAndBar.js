import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ChartSparkAndBar = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <g fillRule="nonzero">
      <path d="M5 9h3v11H5V9zm5.6-5h2.8v16h-2.8V4zm5.6 9.143H19V20h-2.8v-6.857z" />
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
    </g>
  </svg>
);
ChartSparkAndBar.propTypes = { fill: PropTypes.string };
ChartSparkAndBar.defaultProps = { fill: iconColorsMap.mainicon };

export default ChartSparkAndBar;
