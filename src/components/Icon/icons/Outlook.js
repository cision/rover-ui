import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Outlook = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M4 17.7V6.6L14.24 3 20 4.8v14.4L14.24 21 4 17.7l10.24.9V6L7.52 7.2v9z" />
  </svg>
);
Outlook.propTypes = { fill: PropTypes.string };
Outlook.defaultProps = { fill: iconColorsMap.outlook };
export default Outlook;
