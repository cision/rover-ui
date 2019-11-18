import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ChartBarsHorz = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M15 5v3H4V5h11zm5 5.6v2.8H4v-2.8h16zm-9.143 5.6V19H4v-2.8h6.857z" />
  </svg>
);
ChartBarsHorz.propTypes = { fill: PropTypes.string };
ChartBarsHorz.defaultProps = { fill: iconColorsMap.mainicon };

export default ChartBarsHorz;
