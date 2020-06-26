import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ArticleList = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M2 5h6v5H2zM10 5h12v2H10zM10 8h8v2h-8zM2 14h6v5H2zM10 14h12v2H10zM10 17h8v2h-8z" />
  </svg>
);
ArticleList.propTypes = { fill: PropTypes.string };
ArticleList.defaultProps = { fill: iconColorsMap.mainicon };

export default ArticleList;
