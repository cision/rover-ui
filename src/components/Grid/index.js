import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { margin } from 'styled-system';

// Rover UI dependencies
import withDefaultTheme from '../withDefaultTheme';

// This component's dependencies
import style from './style.css';
import Entry from './Entry';

const StyledGrid = styled.div(margin);

const parseGutter = ({ gutter }) => {
  if (typeof gutter === 'number') {
    return { size: gutter, unit: 'px' }; // Gutter is a number of pixels
  }

  let size;

  try {
    size = parseInt(gutter, 10);
  } catch (e) {
    return { size: 0, unit: 'px' };
  }

  const unit = gutter.replace(size, '') || 'px';

  return { size, unit };
};

export const Grid = withDefaultTheme(
  ({
    children,
    className: customClassName,
    gutter,
    columns,
    ...passedProps
  }) => {
    let themeGutter;

    /** `theme.space` prop is provided by the `withDefaultTheme` HOC */
    const { theme } = passedProps;

    if (theme.space[gutter] || theme.space[gutter] === 0) {
      themeGutter = `${theme.space[gutter]}px`; // Gutter is a theme key
    }

    const parsedGutter = parseGutter({ gutter: themeGutter || gutter });
    let safeGutter = `${parsedGutter.size / 2}${parsedGutter.unit}`;
    const inverseGutter = `${-parsedGutter.size / 2}${parsedGutter.unit}`;

    if (parsedGutter.unit === '%') {
      const safeGutterSize =
        (parsedGutter.size / 2) * // Normal gutter size calc
        (100 / (parsedGutter.size + 100)); // Compensate for embiggening from the negative margin on the column wrapper

      safeGutter = `${safeGutterSize}${parsedGutter.unit}`;
    }

    const safeRows = columns || 1;
    const entryPercentWidth = 100 / safeRows;
    const entries = React.Children.toArray(children);

    return (
      <StyledGrid
        {...passedProps}
        className={classNames(style.Grid, customClassName)}
      >
        <div className={style.Columns} style={{ margin: inverseGutter }}>
          {entries.map((child, i) => (
            <Entry
              entryPercentWidth={entryPercentWidth}
              gutter={safeGutter}
              key={`entry${child.key || `.i.${i}`}`}
            >
              {React.cloneElement(child)}
            </Entry>
          ))}
        </div>
      </StyledGrid>
    );
  }
);

Grid.propTypes = {
  children: PropTypes.node,
  /** Optional css class for custom styles */
  className: PropTypes.string,
  columns: PropTypes.number,
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Grid.defaultProps = {
  children: null,
  className: '',
  columns: 1,
  gutter: 0,
};

export default Grid;
