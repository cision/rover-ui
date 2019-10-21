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
      d="M1.265625,0 L0,3.08955224 L0,15.7164179 L4.5,15.7164179 L4.5,18 L7.03125,18 L9.421875,15.7164179 L13.078125,15.7164179 L18,11.0149254 L18,0 L1.265625,0 Z M16.3125,10.2089552 L13.5,12.8955224 L9,12.8955224 L6.609375,15.1791045 L6.609375,12.8955224 L2.8125,12.8955224 L2.8125,1.6119403 L16.3125,1.6119403 L16.3125,10.2089552 Z M13.5,4.70149254 L13.5,9.40298507 L11.8125,9.40298507 L11.8125,4.70149254 L13.5,4.70149254 Z M9,4.70149254 L9,9.40298507 L7.3125,9.40298507 L7.3125,4.70149254 L9,4.70149254 Z"
      transform="translate(3 3)"
    />
  </svg>
);

Twitch.propTypes = { fill: PropTypes.string };
Twitch.defaultProps = { fill: iconColorsMap.twitch };

export default Twitch;
