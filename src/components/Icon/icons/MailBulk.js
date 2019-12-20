import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const MailBulk = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M22 6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-4v2H2v14H0V4c0-1.1.9-2 2-2h12zm8 6v2l-8 5-8-5V8l8 5 8-5z" />
  </svg>
);
MailBulk.propTypes = { fill: PropTypes.string };
MailBulk.defaultProps = { fill: iconColorsMap.mainicon };

export default MailBulk;
