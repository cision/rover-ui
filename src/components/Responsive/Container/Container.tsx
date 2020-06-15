import React from 'react';
import PropTypes from 'prop-types';
import { ContainerQuery } from '@cision/react-container-query';
import {
  ContainerQueries as ReactContainerQueries,
  Query,
} from '@cision/react-container-query/lib/interfaces';
import Context from '../Context';

export interface RoverQuery extends ReactContainerQueries {
  name: string;
  minWidth: number;
}

export const defaultBreakpoints: RoverQuery[] = [
  {
    name: 'xs',
    minWidth: 0,
  },
  {
    name: 'sm',
    minWidth: 600,
  },
  {
    name: 'md',
    minWidth: 900,
  },
  {
    name: 'lg',
    minWidth: 1200,
  },
  {
    name: 'xl',
    minWidth: 1800,
  },
];

export interface ContainerProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  customBreakpoints?: RoverQuery[];
}

export const getBreakpointsQuery = (breakpoints: RoverQuery[]): Query =>
  breakpoints.reduce((result, breakpoint, index) => {
    const { minWidth = 0, name } = breakpoint;
    const nextBreakpoint = breakpoints[index + 1] || null;
    const maxWidth = nextBreakpoint ? nextBreakpoint.minWidth - 0.2 : null;
    const maxProp = maxWidth ? { maxWidth } : {};
    const minProp = minWidth ? { minWidth } : {};

    return {
      ...result,
      // No `min-width` means viewport is always wider or equal to breakpoint min.
      [`container-${name}-up`]: { ...minProp },
      // No `max-width` means the viewport is always narrower or equal to breakpoint max.
      [`container-${name}-down`]: { ...maxProp },
      [`container-${name}-only`]: { ...maxProp, ...minProp },
    };
  }, {});

/**
  Wrap a section of the layout with <Container />.
  It will watch that area for resize events, and make an array of
  media-query-like strings available to child components via a
  <Context.Consumer/>
*/
const Container: React.FC<ContainerProps> = ({
  children,
  customBreakpoints = defaultBreakpoints,
  ...passedProps
}) => {
  let query: Query;

  if (customBreakpoints) {
    query = getBreakpointsQuery(customBreakpoints);
  } else {
    query = getBreakpointsQuery(defaultBreakpoints);
  }

  return (
    <ContainerQuery query={query}>
      {(params, ref) => {
        const responsiveValue = Object.keys(params).reduce<string[]>(
          (result, paramKey) => {
            if (params[paramKey]) {
              result.push(paramKey);
            }
            return result;
          },
          []
        );

        return (
          <div {...passedProps} ref={ref}>
            <Context.Provider value={responsiveValue}>
              {children}
            </Context.Provider>
          </div>
        );
      }}
    </ContainerQuery>
  );
};

Container.propTypes = {
  /** You know, the contents */
  children: PropTypes.node.isRequired,
  /** If you need custom breakpoints, pass them here. It will replace the existing set. */
  customBreakpoints: PropTypes.arrayOf(
    PropTypes.shape({
      /** A text name for this width range (used in responsive modifier names) */
      name: PropTypes.string.isRequired,
      /** These should be the minimum width of the named range */
      minWidth: PropTypes.number.isRequired,
    }).isRequired
  ),
};

Container.defaultProps = {
  customBreakpoints: defaultBreakpoints,
};

export default Container;
