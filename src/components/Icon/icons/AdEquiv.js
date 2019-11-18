import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const AdEquiv = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M13.41,18.09 L13.41,20 L10.74,20 L10.74,18.07 C9.03,17.71 7.58,16.61 7.47,14.67 L9.43,14.67 C9.53,15.72 10.25,16.54 12.08,16.54 C14.04,16.54 14.48,15.56 14.48,14.95 C14.48,14.12 14.04,13.34 11.81,12.81 C9.33,12.21 7.63,11.19 7.63,9.14 C7.63,7.42 9.02,6.3 10.74,5.93 L10.74,4 L13.41,4 L13.41,5.95 C15.27,6.4 16.2,7.81 16.26,9.34 L14.3,9.34 C14.25,8.23 13.66,7.47 12.08,7.47 C10.58,7.47 9.68,8.15 9.68,9.11 C9.68,9.95 10.33,10.5 12.35,11.02 C14.37,11.54 16.53,12.41 16.53,14.93 C16.52,16.76 15.15,17.76 13.41,18.09 Z" />
  </svg>
);
AdEquiv.propTypes = { fill: PropTypes.string };
AdEquiv.defaultProps = { fill: iconColorsMap.mainicon };

export default AdEquiv;
