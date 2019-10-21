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
    <polygon points="4 17.7 4 6.6 14.24 3 20 4.8 20 19.2 14.24 21 4 17.7 14.24 18.6 14.24 6 7.52 7.2 7.52 16.2" />
  </svg>
);
Outlook.propTypes = { fill: PropTypes.string };
Outlook.defaultProps = { fill: iconColorsMap.outlook };
export default Outlook;
