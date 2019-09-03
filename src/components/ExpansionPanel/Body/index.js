import React from 'react';
import PropTypes from 'prop-types';

const Body = ({ children, ...passedProps }) => (
  <div {...passedProps}>{children}</div>
);

Body.propTypes = {
  /**
   * The content to render.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Body.defaultProps = {};

Body.displayName = 'ExpansionPanel.Body';

export default Body;
