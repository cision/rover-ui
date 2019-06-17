---
to: src/components/<%= name %>/index.js
unless_exists: true
---
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';

const <%= name %> = props => {
  return <div>Hello World, from <%= name %>!</div>;
};

<%= name %>.propTypes = {
  // Define your proptypes here
};

<%= name %>.defaultProps = {
  // Define any default prop values here
};

export default <%= name %>;
