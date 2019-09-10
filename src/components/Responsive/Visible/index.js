import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';

import Context from '../Context';

const Visible = ({ children, breakpoints, ...passedProps }) => {
  const getIsVisible = useCallback(
    responsiveContext => !!intersection(breakpoints, responsiveContext).length,
    [breakpoints]
  );

  return (
    <Context.Consumer>
      {responsiveContext => {
        const visible = getIsVisible(responsiveContext);

        return React.Children.map(children, child => {
          if (!child || !visible) {
            return null;
          }

          if (typeof child === 'string') {
            return <span>{child}</span>;
          }

          return React.cloneElement(child, {
            ...passedProps,
          });
        });
      }}
    </Context.Consumer>
  );
};

Visible.propTypes = {
  children: PropTypes.node,
  container: PropTypes.string,
  breakpoints: PropTypes.arrayOf(PropTypes.string),
};

Visible.defaultProps = {
  children: null,
  container: null,
  breakpoints: [],
};

export default Visible;
