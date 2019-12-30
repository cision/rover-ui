import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const MarkAsUnread = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M20 7H10v6H8V5h6V1H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
  </svg>
);
MarkAsUnread.propTypes = { fill: PropTypes.string };
MarkAsUnread.defaultProps = { fill: iconColorsMap.mainicon };

export default MarkAsUnread;
