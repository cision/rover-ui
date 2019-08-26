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
      d="M4.27 3L3 6.09v12.63h4.5V21h2.53l2.4-2.28h3.65l4.92-4.7V3H4.27zM19.3 13.2l-2.81 2.7H12l-2.4 2.28V15.9H5.82V4.6h13.5v8.6zM16.5 7.7v4.7h-1.69V7.7h1.69zm-4.5 0v4.7h-1.69V7.7H12z"
    />
  </svg>
);

Twitch.propTypes = { fill: PropTypes.string };
Twitch.defaultProps = { fill: iconColorsMap.twitch };

export default Twitch;
