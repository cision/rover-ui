import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Addon from './Addon';

import styles from './Pill.module.css';

export interface PillProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'onClick'> {
  checked?: boolean;
  className?: string;
  onClick?: (() => void) | null;
}

const defaultProps = {
  checked: false,
  className: '',
  onClick: null,
};

type PillType = React.FC<PillProps> & {
  Addon: typeof Addon;
};

const Pill: PillType = ({
  children: initChildren,
  checked = defaultProps.checked,
  className = defaultProps.className,
  onClick = defaultProps.onClick,
  ...passedProps
}) => {
  let children = initChildren;

  // FIXME: There is no clear way in React OR in TypeScript to check which
  // _exact_ component is one of the children. In addition, React does not
  // provide a built-in type-safe way to check against the "displayName"
  // of a React component.
  //
  // For now, I'm casting the child as a very rudimentary object that will
  // work for checking, but will not be used in execution
  children = React.Children.map(initChildren, (child) => {
    const c = child as React.ReactElement & { type: { displayName?: string } };
    return c?.type?.displayName === Addon.displayName ? (
      <div className={styles.actionInline}>
        {React.cloneElement(child as React.ReactElement, { checked })}
      </div>
    ) : (
      child && <span className={styles.content}>{child}</span>
    );
  });

  const clickableProps = onClick
    ? {
        role: 'button',
        tabIndex: 0,
        onClick,
      }
    : {};

  return (
    <div
      {...passedProps}
      {...clickableProps}
      className={classNames(styles.Pill, className, {
        [styles.checked]: checked,
      })}
    >
      {children}
    </div>
  );
};

Pill.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Pill.defaultProps = defaultProps;

Pill.Addon = Addon;

export default Pill;
