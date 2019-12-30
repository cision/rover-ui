import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const Home = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);
Home.propTypes = { fill: PropTypes.string };
Home.defaultProps = { fill: iconColorsMap.mainicon };

export default Home;
