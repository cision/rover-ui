import React from 'react';
import PropTypes from 'prop-types';
import { ContainerQuery } from 'react-container-query';
import { Context } from '../Context';

// breakpointMins should be in sync with `@trendkite/ui/src/styles/_breakpoints.scss: $breakpoint-mins`
const defaultBreakpoints = [
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

export const getBreakpointsQuery = breakpoints =>
  breakpoints.reduce((result, breakpoint, index) => {
    const { minWidth, name } = breakpoint;
    const nextBreakpoint = breakpoints[index + 1] || null;
    const maxWidth = nextBreakpoint ? nextBreakpoint.minWidth - 0.2 : null;

    // Add 'up' queries
    if (minWidth) {
      result[`container-${name}-up`] = { minWidth };
    }

    if (maxWidth) {
      result[`container-${name}-down`] = { maxWidth };
    }

    if (minWidth && maxWidth) {
      result[`container-${name}-only`] = { minWidth, maxWidth };
    } else if (minWidth) {
      result[`container-${name}-only`] = { minWidth };
    } else if (maxWidth) {
      result[`container-${name}-only`] = { maxWidth };
    }

    return result;
  }, {});

/**
  Wrap a section of the layout with <Container />.
  It will watch that area for resize events, and make an array of
  media-query-like strings available to child components via a
  <Context.Consumer/>
*/
export const Container = props => {
  let query;

  if (props.customBreakpoints) {
    query = getBreakpointsQuery(props.customBreakpoints);
  } else {
    query = getBreakpointsQuery(defaultBreakpoints);
  }

  return (
    <ContainerQuery query={query}>
      {params => {
        const responsiveValue = Object.keys(params).reduce(
          (result, paramKey) => {
            if (params[paramKey]) {
              result.push(paramKey);
            }
            return result;
          },
          []
        );

        return (
          <Context.Provider value={responsiveValue}>
            {props.children}
          </Context.Provider>
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
      name: PropTypes.string,
      /** These should be the minimum width of the named range */
      minWidth: PropTypes.number,
    })
  ),
};

Container.defaultProps = {
  customBreakpoints: defaultBreakpoints,
};

export default Container;
