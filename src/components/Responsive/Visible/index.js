import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';

import Context from '../Context';

const Visible = ({
  children,
  responsiveContext: VisibleResponsiveContext,
  ...passedProps
}) => {
  const getIsVisible = useCallback(
    responsiveContext =>
      !!intersection(VisibleResponsiveContext, responsiveContext).length,
    [VisibleResponsiveContext]
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
  responsiveContext: PropTypes.arrayOf(PropTypes.string),
};

Visible.defaultProps = {
  children: null,
  container: null,
  responsiveContext: [],
};

export default Visible;
