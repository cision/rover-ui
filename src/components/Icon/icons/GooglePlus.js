import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const GooglePlus = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill={fill}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10,18c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S14.4,18,10,18z M16.2,9.3h-1.5V7.8h-1.1v1.5h-1.5v1.1h1.5v1.5 h1.1v-1.5h1.5V9.3z M7.8,10.7L7.8,10.7l2,0c-0.1,0.6-0.6,1.5-2,1.5c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2c0.7,0,1.1,0.3,1.4,0.5l1-1 C9.6,6.7,8.8,6.4,7.8,6.4c-2,0-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6c2.1,0,3.5-1.5,3.5-3.6c0-0.3,0-0.5-0.1-0.7H7.8V10.7z"
    />
  </svg>
);

GooglePlus.propTypes = { fill: PropTypes.string };
GooglePlus.defaultProps = { fill: iconColorsMap.googleplus };

export default GooglePlus;
