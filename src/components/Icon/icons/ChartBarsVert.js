import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ChartBarsVert = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M5 9h3v11H5V9zm5.6-5h2.8v16h-2.8V4zm5.6 9.143H19V20h-2.8v-6.857z" />
  </svg>
);
ChartBarsVert.propTypes = { fill: PropTypes.string };
ChartBarsVert.defaultProps = { fill: iconColorsMap.mainicon };

export default ChartBarsVert;
