import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const AddCircle = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
  </svg>
);
AddCircle.propTypes = { fill: PropTypes.string };
AddCircle.defaultProps = { fill: iconColorsMap.mainicon };

export default AddCircle;
