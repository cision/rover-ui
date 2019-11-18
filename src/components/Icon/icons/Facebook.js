import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Facebook = ({ fill, ...props }) => (
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
      d="M18.003 3H5.997c-.41 0-.798.08-1.164.237a3.036 3.036 0 00-.954.642 3.04 3.04 0 00-.642.954A2.905 2.905 0 003 5.997v12.006c0 .41.08.798.237 1.164.159.367.372.685.642.954.27.27.587.483.954.642.366.158.754.237 1.164.237H12v-7.875H9.75v-2.25H12V9.187a2.755 2.755 0 01.826-1.986 2.755 2.755 0 011.986-.826h2.813v2.25h-2.813a.566.566 0 00-.22.044.476.476 0 00-.175.123.476.476 0 00-.123.176.566.566 0 00-.044.22v1.687h3.094l-.563 2.25H14.25V21h3.753c.41 0 .798-.08 1.164-.237a3.03 3.03 0 00.954-.642c.27-.27.483-.587.642-.954.158-.366.237-.754.237-1.164V5.997c0-.41-.08-.798-.237-1.164a3.036 3.036 0 00-.642-.954 3.036 3.036 0 00-.954-.642A2.905 2.905 0 0018.003 3z"
    />
  </svg>
);

Facebook.propTypes = { fill: PropTypes.string };
Facebook.defaultProps = { fill: iconColorsMap.facebook };

export default Facebook;
