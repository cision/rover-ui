import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const News = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M18 3v18H4a2 2 0 01-2-2V3h16zm4 6v10a2 2 0 01-1.85 1.995L20 21V9h2zM11 9H4v9a1 1 0 00.883.993L5 19h6V9zm5 8h-3v2h3v-2zm0-8h-3v6h3V9zm0-4H4v2h12V5z" />
  </svg>
);
News.propTypes = { fill: PropTypes.string };
News.defaultProps = { fill: iconColorsMap.mainicon };

export default News;
