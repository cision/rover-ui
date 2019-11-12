import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Calendar = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <path
        id="a"
        d="M20 4v16L8 14.667V9.333L20 4zM6.667 9.333v8H4v-8h2.667zM17.333 8l-6.666 2.878v2.455L17.333 16V8z"
      />
    </defs>
    <use fill={fill} xlinkHref="#a" />
  </svg>
);
Calendar.propTypes = { fill: PropTypes.string };
Calendar.defaultProps = { fill: iconColorsMap.mainicon };

export default Calendar;
