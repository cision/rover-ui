import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Facebook = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 512 512"
    fill={fill}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M464 0h-416c-26.4 0-48 21.6-48 48v416c0 26.4 21.6 48 48 48h208v-224h-64v-64h64v-32c0-52.9 43.1-96 96-96h64v64h-64c-17.6 0-32 14.4-32 32v32h96l-16 64h-80v224h144c26.4 0 48-21.6 48-48v-416c0-26.4-21.6-48-48-48z"
    />
  </svg>
);

Facebook.propTypes = { fill: PropTypes.string };
Facebook.defaultProps = { fill: iconColorsMap.facebook };

export default Facebook;
