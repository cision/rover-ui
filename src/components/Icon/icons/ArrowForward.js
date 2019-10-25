import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ArrowForward = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);
ArrowForward.propTypes = { fill: PropTypes.string };
ArrowForward.defaultProps = { fill: iconColorsMap.mainicon };

export default ArrowForward;
