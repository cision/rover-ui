import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Smartphone = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M5 1v22h14V1H5zm12 18H7V5h10v14z" />
  </svg>
);
Smartphone.propTypes = { fill: PropTypes.string };
Smartphone.defaultProps = { fill: iconColorsMap.mainicon };

export default Smartphone;
