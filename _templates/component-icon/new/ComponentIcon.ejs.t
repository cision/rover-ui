---
to: src/components/Icon/icons/<%= h.changeCase.pascal(name) %>.js
---
import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const <%= h.changeCase.pascal(name) %> = ({ fill, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <%- h.fileContents("src/components/Icon/svg-icon/main/"+(name)+".svg") %>
  </svg>
);
<%= h.changeCase.pascal(name) %>.propTypes = { fill: PropTypes.string };
<%= h.changeCase.pascal(name) %>.defaultProps = { fill: iconColorsMap.mainicon };

export default <%= h.changeCase.pascal(name) %>;
