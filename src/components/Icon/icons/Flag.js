import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Flag = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
  </svg>
);
Flag.propTypes = { fill: PropTypes.string };
Flag.defaultProps = { fill: iconColorsMap.mainicon };

export default Flag;
