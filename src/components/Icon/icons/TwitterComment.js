import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const TwitterComment = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <defs>
      <path
        id="a"
        d="M16.156 14.202c-.805.68-3.447 2.414-4.801 3.291v-2.259a.532.532 0 00-.531-.532h-.282c-2.596 0-4.48-1.754-4.48-4.172 0-2.505 1.963-4.467 4.467-4.467l2.939.006c2.506 0 4.466 1.961 4.468 4.464 0 1.354-.667 2.725-1.78 3.67M13.47 5.005L10.531 5h-.002C7.429 5 5 7.428 5 10.53c0 2.904 2.258 5.108 5.292 5.224v2.714a.531.531 0 00.817.448c.188-.118 4.59-2.935 5.734-3.903C18.19 13.872 18.997 12.2 19 10.54v-.012c-.004-3.096-2.432-5.52-5.529-5.522"
      />
    </defs>
    <use xlinkHref="#a" />
  </svg>
);

TwitterComment.propTypes = { fill: PropTypes.string };
TwitterComment.defaultProps = { fill: iconColorsMap.twittercomment };
export default TwitterComment;
