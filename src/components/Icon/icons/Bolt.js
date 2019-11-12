import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Bolt = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M12 2.02c-5.51 0-9.98 4.47-9.98 9.98 0 5.51 4.47 9.98 9.98 9.98 5.51 0 9.98-4.47 9.98-9.98 0-5.51-4.47-9.98-9.98-9.98zM11.48 20v-6.26H8L13 4v6.26h3.35L11.48 20z" />
  </svg>
);
Bolt.propTypes = { fill: PropTypes.string };
Bolt.defaultProps = { fill: iconColorsMap.mainicon };

export default Bolt;
