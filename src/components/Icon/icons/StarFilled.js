import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const StarFilled = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);
StarFilled.propTypes = { fill: PropTypes.string };
StarFilled.defaultProps = { fill: iconColorsMap.mainicon };

export default StarFilled;
