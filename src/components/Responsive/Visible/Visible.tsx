import React, { useCallback, ReactElement } from 'react';
import intersection from 'lodash/intersection';

import Context from '../Context';

interface VisibleProps {
  breakpoints: string[];
}

const Visible: React.FC<VisibleProps> = ({
  children,
  breakpoints = [],
  ...passedProps
}) => {
  const getIsVisible = useCallback(
    (responsiveContext) =>
      !!intersection(breakpoints, responsiveContext).length,
    [breakpoints]
  );

  return (
    <Context.Consumer>
      {(responsiveContext) => {
        const visible = getIsVisible(responsiveContext);

        return React.Children.map(children, (child) => {
          if (!child || !visible) {
            return null;
          }

          if (typeof child === 'string') {
            return <span>{child}</span>;
          }

          return React.cloneElement(child as ReactElement, {
            ...passedProps,
          });
        });
      }}
    </Context.Consumer>
  );
};

export default Visible;
