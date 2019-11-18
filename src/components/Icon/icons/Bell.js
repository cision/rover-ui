import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Bell = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        fill={fill}
        fillRule="nonzero"
        d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
      />
    </g>
  </svg>
);
Bell.propTypes = { fill: PropTypes.string };
Bell.defaultProps = { fill: iconColorsMap.mainicon };

export default Bell;
