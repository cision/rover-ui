import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Report = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M13 5v1h6l-.001 9H20v2h-5l2 2-1 1-3-3v3h-2v-3l-3 3-1-1 2-2H4v-2h1V6h6V5h2zm4 3H7v7h9.999L17 8z" />
  </svg>
);
Report.propTypes = { fill: PropTypes.string };
Report.defaultProps = { fill: iconColorsMap.mainicon };

export default Report;
