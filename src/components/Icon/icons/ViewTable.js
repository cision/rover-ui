import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ViewTable = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z" />
  </svg>
);
ViewTable.propTypes = { fill: PropTypes.string };
ViewTable.defaultProps = { fill: iconColorsMap.mainicon };

export default ViewTable;
