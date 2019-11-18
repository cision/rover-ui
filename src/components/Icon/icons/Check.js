import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Chat = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);
Chat.propTypes = { fill: PropTypes.string };
Chat.defaultProps = { fill: iconColorsMap.mainicon };

export default Chat;
