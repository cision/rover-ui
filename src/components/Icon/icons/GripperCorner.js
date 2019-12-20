import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const GripperCorner = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M20.828 22.657l2.829-2.829-1.414-1.414-2.829 2.829 1.414 1.414zM7.393 19.12l1.415 1.415L21.536 7.808 20.12 6.393 7.393 19.121zm7.071 2.829l8.486-8.486-1.414-1.414-8.486 8.486 1.414 1.414z" />
  </svg>
);
GripperCorner.propTypes = { fill: PropTypes.string };
GripperCorner.defaultProps = { fill: iconColorsMap.mainicon };

export default GripperCorner;
