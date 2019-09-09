import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';

import Context from '../Context';

const Hidden = ({
  children,
  responsiveContext: hiddenResponsiveContext,
  ...passedProps
}) => {
  const getIsHidden = useCallback(
    responsiveContext =>
      !!intersection(hiddenResponsiveContext, responsiveContext).length,
    [hiddenResponsiveContext]
  );

  return (
    <Context.Consumer>
      {responsiveContext => {
        const hidden = getIsHidden(responsiveContext);

        return React.Children.map(children, child => {
          if (!child || hidden) {
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

Hidden.propTypes = {
  children: PropTypes.node,
  container: PropTypes.string,
  responsiveContext: PropTypes.arrayOf(PropTypes.string),
};

Hidden.defaultProps = {
  children: null,
  container: null,
  responsiveContext: [],
};

export default Hidden;
