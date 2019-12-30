import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ViewVerticalSplit = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M3 15h8v-2H3v2zm0 4h8v-2H3v2zm0-8h8V9H3v2zm0-6v2h8V5H3zm10 0h8v14h-8V5z" />
  </svg>
);
ViewVerticalSplit.propTypes = { fill: PropTypes.string };
ViewVerticalSplit.defaultProps = { fill: iconColorsMap.mainicon };

export default ViewVerticalSplit;
