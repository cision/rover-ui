import React, { useCallback, ReactElement } from 'react';
import intersection from 'lodash/intersection';

import Context from '../Context';

interface HiddenProps {
  breakpoints: string[];
}

const Hidden: React.FC<HiddenProps> = ({
  children,
  breakpoints,
  ...passedProps
}) => {
  const getIsHidden = useCallback(
    (responsiveContext) =>
      !!intersection(breakpoints, responsiveContext).length,
    [breakpoints]
  );

  return (
    <Context.Consumer>
      {(responsiveContext) => {
        const hidden = getIsHidden(responsiveContext);

        return React.Children.map(children, (child) => {
          if (!child || hidden) {
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

export default Hidden;
