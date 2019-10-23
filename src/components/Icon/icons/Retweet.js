import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Retweet = ({ fill, ...props }) => (
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
        d="M15.942 6c1.38 0 2.504 1.173 2.504 2.617v7.597l1.699-1.776a.487.487 0 01.708 0 .54.54 0 010 .74l-2.554 2.67a.487.487 0 01-.709 0l-2.553-2.67a.54.54 0 010-.74.487.487 0 01.708 0l1.7 1.776V8.617c0-.866-.675-1.57-1.503-1.57h-4.44A.512.512 0 0111 6.523c0-.289.224-.524.501-.524zm-10.24.154a.483.483 0 01.707 0l2.555 2.668a.54.54 0 010 .74.488.488 0 01-.71 0L6.556 7.788v7.597c0 .865.674 1.569 1.503 1.569h4.44c.276 0 .501.235.501.523 0 .29-.225.523-.501.523h-4.44c-1.38 0-2.505-1.173-2.505-2.615V7.788l-1.7 1.774a.483.483 0 01-.707 0 .54.54 0 010-.74z"
      />
    </defs>
    <use xlinkHref="#a" />
  </svg>
);
Retweet.propTypes = { fill: PropTypes.string };
Retweet.defaultProps = { fill: iconColorsMap.retweet };
export default Retweet;
