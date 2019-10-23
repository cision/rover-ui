import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Reddit = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#FF4500"
        d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12"
      />
      <path
        fill="#FFFFFE"
        d="M14.75 14.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm.22 2.053c-.853.852-2.488.918-2.969.918-.48 0-2.115-.066-2.967-.918a.324.324 0 01.458-.458c.538.538 1.688.728 2.51.728.821 0 1.972-.19 2.51-.728a.324.324 0 01.458.458zM8 13.25a1.251 1.251 0 012.5 0 1.25 1.25 0 01-2.5 0zM19.998 12a1.75 1.75 0 00-2.964-1.259c-1.196-.863-2.844-1.42-4.68-1.485l.797-3.75 2.605.553A1.247 1.247 0 0018.25 6a1.246 1.246 0 00-2.366-.552l-2.908-.619a.312.312 0 00-.37.24l-.891 4.186c-1.863.052-3.537.61-4.749 1.483a1.75 1.75 0 10-1.926 2.858c-.027.174-.042.35-.042.529 0 2.692 3.134 4.875 7 4.875s7-2.183 7-4.875c0-.178-.014-.353-.041-.526A1.75 1.75 0 0019.998 12z"
      />
    </g>
  </svg>
);

Reddit.propTypes = { fill: PropTypes.string };
Reddit.defaultProps = { fill: iconColorsMap.reddit };

export default Reddit;
