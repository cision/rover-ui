import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ViewStream = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z" />
  </svg>
);
ViewStream.propTypes = { fill: PropTypes.string };
ViewStream.defaultProps = { fill: iconColorsMap.mainicon };

export default ViewStream;
