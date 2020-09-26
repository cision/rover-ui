import React, { ReactElement } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { margin } from 'styled-system';

// Rover UI dependencies
import { parseCssSize } from '../../shared/css-utils';
import withDefaultTheme from '../withDefaultTheme';

// This component's dependencies
import styles from './Grid.module.css';
import Entry from './Entry';

const StyledGrid = styled.div(margin);

interface BaseGridProps {
  children?: ReactElement[];
  className?: string;
  columns?: number;

  // Too many gutter data formats are supported to nail this type down further.
  //
  gutter?: string | number;

  // Using more theme properties than just `space` will require this type to be broadened.
  //
  theme?: Record<'space', Record<string, number>>;
}

export const Grid = withDefaultTheme(
  ({
    children = [],
    className: customClassName = '',
    gutter = 0,
    columns = 1,
    theme,
    ...passedProps
  }: BaseGridProps) => {
    let themeGutter;

    /** `theme` and `theme.space` prop are provided by the `withDefaultTheme` HOC */

    if (theme?.space[gutter] || theme?.space[gutter] === 0) {
      themeGutter = `${theme?.space[gutter]}px`; // Gutter is a theme key
    }

    const parsedGutter = parseCssSize({ size: themeGutter || gutter });
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
        theme
        {...passedProps}
        className={classNames(styles.Grid, customClassName)}
      >
        <div className={styles.gridColumns} style={{ margin: inverseGutter }}>
          {(entries as ReactElement[]).map((child: ReactElement) => (
            <Entry
              entryPercentWidth={entryPercentWidth}
              gutter={safeGutter}
              key={`entry${child.key}`}
            >
              {React.cloneElement(child)}
            </Entry>
          ))}
        </div>
      </StyledGrid>
    );
  }
);

export default Grid;
