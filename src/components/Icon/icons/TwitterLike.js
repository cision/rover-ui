import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const TwitterLike = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <defs>
      <path
        id="a"
        d="M8.764 6.11c-1.449 0-2.718 1.472-2.718 3.15 0 4.249 4.898 8.583 5.954 8.63 1.057-.047 5.956-4.381 5.956-8.63 0-1.678-1.271-3.15-2.72-3.15-1.76 0-2.744 2.173-2.752 2.194-.161.416-.807.416-.967 0-.008-.021-.991-2.194-2.753-2.194zM12 19h-.01C10.192 18.964 5 13.98 5 9.26 5 6.99 6.759 5 8.764 5 10.359 5 11.432 6.17 12 7.02 12.568 6.17 13.641 5 15.236 5 17.241 5 19 6.99 19 9.26c0 4.72-5.19 9.704-6.99 9.74H12z"
      />
    </defs>
    <use xlinkHref="#a" />
  </svg>
);
TwitterLike.propTypes = { fill: PropTypes.string };
TwitterLike.defaultProps = { fill: iconColorsMap.twitterlike };
export default TwitterLike;