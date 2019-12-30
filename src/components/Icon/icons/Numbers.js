import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Numbers = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M19 4c.552 0 1 .445 1 1v14c0 .552-.445 1-1 1H5c-.552 0-1-.445-1-1V5c0-.552.445-1 1-1h14zM7 8H6v1h1v7h1V8.997C8 8.453 7.552 8 7 8zm5.001 0h-1.002a.996.996 0 00-.992.883L10 9h2v2h-1a.997.997 0 00-.993.883L10 12v3c0 .517.386.936.882.993L11 16h1.002a.996.996 0 00.992-.883L13 15h-2v-3h1a1 1 0 00.993-.892l.007-.117V9.009A.999.999 0 0012.001 8zm5 0h-1.002A.997.997 0 0015 9h2v2h-2v1h2v3h-2l.007.116c.057.493.48.884.992.884h1.002a.995.995 0 00.999-.997V8.997c0-.544-.447-.997-.999-.997z" />
  </svg>
);
Numbers.propTypes = { fill: PropTypes.string };
Numbers.defaultProps = { fill: iconColorsMap.mainicon };

export default Numbers;
