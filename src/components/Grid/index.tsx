import React, { ReactElement } from 'react';
import classNames from 'classnames';

// Rover UI dependencies
import { parseCssSize } from '../../shared/css-utils';

// This component's dependencies
import styles from './Grid.module.css';
import Entry from './Entry';

interface BaseGridProps {
  children?: React.ReactNode;
  className?: string;
  columns?: number;
  gutter?: string | number;
}

export const Grid: React.FC<BaseGridProps> = ({
  children,
  className: customClassName = '',
  gutter = 0,
  columns = 1,
  ...passedProps
}) => {
  const parsedGutter = parseCssSize({ size: gutter });
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
  const entries = React.Children.toArray(children) || [];

  return (
    <div {...passedProps} className={classNames(styles.Grid, customClassName)}>
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
    </div>
  );
};

export default Grid;
