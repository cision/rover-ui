import React from 'react';
import PropTypes from 'prop-types';

import UnresponsiveGrid from '../../Grid';
import Context from '../Context';

const Grid = ({ breakpoints, children, columns, gutter, ...passedProps }) => {
  let responsiveProps = {
    columns,
    gutter,
  };

  let responsiveChildren = children;

  return (
    <Context.Consumer>
      {context => {
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
          responsiveChildren = React.Children.map(children, child => {
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

Grid.propTypes = {
  /** Map of breakpoint labels (like container-xs-up) to object of columns and gutter props */
  breakpoints: PropTypes.object,
  children: PropTypes.node,
  /** Fallback column count */
  columns: PropTypes.number,
  /** Fallback gutter width */
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Grid.defaultProps = {
  breakpoints: {
    'container-xs-up': {
      columns: 1,
      gutter: 0,
    },
  },
  children: '',
  columns: 1,
  gutter: 0,
};

export default Grid;
