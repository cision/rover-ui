import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Dashboard = ({ fill, ...props }) => (
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
        d="M3 11h12V3H3v8zm0 10h8v-8H3v8zm10 0h8v-8h-8v8zm4-18v8h4V3h-4z"
      />
    </g>
  </svg>
);
Dashboard.propTypes = { fill: PropTypes.string };
Dashboard.defaultProps = { fill: iconColorsMap.mainicon };

export default Dashboard;
