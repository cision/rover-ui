import React, { ReactElement } from 'react';

import UnresponsiveGrid from '../../Grid';
import Context from '../Context';

type GridGutter = number | string;

type GridDefinition = {
  [key: string]: {
    columns?: number;
    gutter?: GridGutter;
  };
};

interface GridProps {
  breakpoints?: GridDefinition;
  columns?: number;
  gutter?: GridGutter;
}

const Grid: React.FC<GridProps> = ({
  breakpoints = {
    'container-xs-up': {
      columns: 1,
      gutter: 0,
    },
  },
  children = '',
  columns = 1,
  gutter = 0,
  ...passedProps
}) => {
  let responsiveProps = {
    columns,
    gutter,
  };

  let responsiveChildren = children;

  return (
    <Context.Consumer>
      {(context) => {
        if (context && context.length) {
          /*
            If the current responsive context matches a configured breakpoint on
            the parent, use the breakpoint's column and gutter props.
          */
          responsiveProps = context.reduce(
            (result, query) => ({
              ...result,
              ...breakpoints[query],
            }),
            responsiveProps
          );

          /*
            If the current responsive context matches a configured breakpoint on
            a child, use the breakpoint's colSpan for that child
          */
          responsiveChildren = React.Children.map(children, (origChild) => {
            const child = origChild as ReactElement;
            const childProps = (child && child.props) || {};
            const { clear = false, colSpan = 1, offset = 0 } = childProps;
            let { breakpoints: childBreakpoints } = childProps;
            childBreakpoints = childBreakpoints || {};

            const responsiveChildProps = context.reduce(
              (result, query) => ({
                ...result,
                ...childBreakpoints[query],
              }),
              {
                clear,
                colSpan,
                offset,
              }
            );

            return React.cloneElement(child, {
              ...responsiveChildProps,
            });
          });
        }

        return (
          <UnresponsiveGrid {...passedProps} {...responsiveProps}>
            {responsiveChildren}
          </UnresponsiveGrid>
        );
      }}
    </Context.Consumer>
  );
};

export default Grid;
