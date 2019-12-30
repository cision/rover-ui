import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Key = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M20.75 9.5h-9.42a5 5 0 100 5H12l1.25-1.25h1.25v1.25h1.25L17 13.25h1.25v1.25h1.25L22 12l-1.25-2.5zm-15 4.268a1.768 1.768 0 110-3.536 1.768 1.768 0 010 3.536zM12 11.375v-.625h7.5l.313.625H12z" />
  </svg>
);
Key.propTypes = { fill: PropTypes.string };
Key.defaultProps = { fill: iconColorsMap.mainicon };

export default Key;
