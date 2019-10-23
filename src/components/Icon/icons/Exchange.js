import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Exchange = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M13.083 4.096L3 5.712v12.653l10.083 1.616V4.096zM5.95 14.99V8.353l3.68-.365v1.343l-2.243.146v1.536l2.087-.05v1.332l-2.087-.02v1.578l2.39.126v1.343L5.95 14.99zm8.084-7.796v9.69H20.1c.496 0 .899-.373.899-.833V8.027c0-.46-.403-.833-.9-.833h-6.065z"
    />
  </svg>
);

Exchange.propTypes = { fill: PropTypes.string };
Exchange.defaultProps = { fill: iconColorsMap.exchange };
export default Exchange;
