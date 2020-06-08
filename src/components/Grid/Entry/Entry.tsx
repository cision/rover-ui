import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './Entry.module.css';

interface EntryProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode; // the `children` prop is required
  entryPercentWidth?: number;
  gutter?: number | string;
}

/**
  This component should only be used by the Grid component.
  It has no public API.
*/
const Entry: React.FC<EntryProps> = ({
  children,
  entryPercentWidth = 100,
  gutter = 0,
  ...passedProps
}) => {
  const c = children as React.ReactElement;
  const childProps = c.props || {};
  let { clear = false, colSpan = 1, offset = 0 } = childProps;
  clear = !!clear && clear !== 'false';
  colSpan = parseInt(colSpan, 10) || 1;
  offset = parseInt(offset, 10) || 0;

  const entry = (
    <div
      {...passedProps}
      className={styles.Entry}
      style={{
        flexBasis: `${entryPercentWidth * colSpan}%`,
        marginInlineStart: `${entryPercentWidth * offset}%`,
        maxWidth: `${entryPercentWidth * colSpan}%`,
        padding: gutter,
      }}
    >
      {React.cloneElement(c, {
        clear: undefined,
        colSpan: undefined,
        offset: undefined,
      })}
    </div>
  );

  if (clear) {
    return (
      <Fragment>
        <div className={styles.Clear} />
        {entry}
      </Fragment>
    );
  }

  return entry;
};

Entry.propTypes = {
  children: PropTypes.node,
  entryPercentWidth: PropTypes.number,
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Entry.defaultProps = {
  children: '',
  entryPercentWidth: 100,
  gutter: 0,
};

export default Entry;
