import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ChartBarsStacked = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M5 11.2h3V20H5v-8.8zM10.6 9h2.8v11h-2.8V9zm5.6 6H19v5h-2.8v-5zm0-7H19v6h-2.8V8zm-5.6-4h2.8v4h-2.8V4zM5 6.2h3V10H5V6.2z" />
  </svg>
);
ChartBarsStacked.propTypes = { fill: PropTypes.string };
ChartBarsStacked.defaultProps = { fill: iconColorsMap.mainicon };

export default ChartBarsStacked;
