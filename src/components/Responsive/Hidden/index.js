import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';

import Context from '../Context';

const Hidden = ({ children, breakpoints, ...passedProps }) => {
  const getIsHidden = useCallback(
    responsiveContext => !!intersection(breakpoints, responsiveContext).length,
    [breakpoints]
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
  breakpoints: PropTypes.arrayOf(PropTypes.string),
};

Hidden.defaultProps = {
  children: null,
  container: null,
  breakpoints: [],
};

export default Hidden;
