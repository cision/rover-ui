import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ListViewActive = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M21 11.01L3 11v2h18v-1.99zM3 16h12v2H3v-2zM21 6H3v2.01L21 8V6z" />
  </svg>
);
ListViewActive.propTypes = { fill: PropTypes.string };
ListViewActive.defaultProps = { fill: iconColorsMap.mainicon };

export default ListViewActive;
