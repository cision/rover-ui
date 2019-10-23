import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Twitch = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4.266 3L3 6.09v12.626h4.5V21h2.531l2.39-2.284h3.657L21 14.015V3H4.266zm15.046 10.209L16.5 15.896H12l-2.39 2.283v-2.283H5.812V4.612h13.5v8.597zM16.5 7.701v4.702h-1.688V7.701H16.5zm-4.5 0v4.702h-1.688V7.701H12z"
    />
  </svg>
);

Twitch.propTypes = { fill: PropTypes.string };
Twitch.defaultProps = { fill: iconColorsMap.twitch };

export default Twitch;
