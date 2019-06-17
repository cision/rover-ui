---
to: src/components/<%= h.changeCase.pascal(name) %>/index.js
unless_exists: true
---
import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';

const <%= h.changeCase.pascal(name) %> = props => {
  return <div>Hello World, from <%= h.changeCase.pascal(name) %>!</div>;
};

<%= h.changeCase.pascal(name) %>.propTypes = {
  // Define your proptypes here
};

<%= h.changeCase.pascal(name) %>.defaultProps = {
  // Define any default prop values here
};

export default <%= h.changeCase.pascal(name) %>;
