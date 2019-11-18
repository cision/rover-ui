import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const AddToGroup = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
  </svg>
);
AddToGroup.propTypes = { fill: PropTypes.string };
AddToGroup.defaultProps = { fill: iconColorsMap.mainicon };

export default AddToGroup;
