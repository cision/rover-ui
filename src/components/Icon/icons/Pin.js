import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Pin = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M13.286 3L12 4.286l1.286 1.285-5.143 5.143H4.286l3.857 3.857L3 19.714V21h1.286l5.143-5.143 3.857 3.857-.161-3.857 5.304-5.143L19.714 12 21 10.714 13.286 3zm-2.572 10.286L9.43 12l5.142-5.143 1.286 1.286-5.143 5.143z" />
  </svg>
);
Pin.propTypes = { fill: PropTypes.string };
Pin.defaultProps = { fill: iconColorsMap.mainicon };

export default Pin;
