import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const ArticleList = ({ fill, ...props }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} {...props}>
    <rect x="2" y="5" width="6" height="5" />
    <rect x="10" y="5" width="12" height="2" />
    <rect x="10" y="8" width="8" height="2" />
    <rect x="2" y="14" width="6" height="5" />
    <rect x="10" y="14" width="12" height="2" />
    <rect x="10" y="17" width="8" height="2" />
  </svg>
);
ArticleList.propTypes = { fill: PropTypes.string };
ArticleList.defaultProps = { fill: iconColorsMap.mainicon };

export default ArticleList;
