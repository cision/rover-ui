import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ChartArea = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <g fillRule="nonzero">
      <path d="M2 20h20V9.92L20 9l-7 8-4-4-7 5.99z" />
      <path d="M2 16l7-7 4 3 7-8 2 3v3l-2-1-7 8-4-4-7 6z" />
    </g>
  </svg>
);
ChartArea.propTypes = { fill: PropTypes.string };
ChartArea.defaultProps = { fill: iconColorsMap.mainicon };

export default ChartArea;
