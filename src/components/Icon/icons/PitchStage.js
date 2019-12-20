import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const PitchStage = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M6.433 10.857L2 15.43 6.433 20v-3.429h7.79v-2.285h-7.79v-3.429zM22 8.571L17.567 4v3.429h-7.79v2.285h7.79v3.429L22 8.57z" />
  </svg>
);
PitchStage.propTypes = { fill: PropTypes.string };
PitchStage.defaultProps = { fill: iconColorsMap.mainicon };

export default PitchStage;
