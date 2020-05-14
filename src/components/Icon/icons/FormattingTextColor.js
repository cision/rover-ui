import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const FormattingTextColor = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <g fillRule="nonzero">
      <path d="M0 20h24v4H0zM11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z" />
    </g>
  </svg>
);
FormattingTextColor.propTypes = { fill: PropTypes.string };
FormattingTextColor.defaultProps = { fill: iconColorsMap.mainicon };

export default FormattingTextColor;
