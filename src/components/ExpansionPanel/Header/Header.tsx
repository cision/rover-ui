import React from 'react';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

import styles from './Header.module.css';

type ChildFunction = (icon: React.ReactElement) => React.ReactNode;

interface HeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode | ChildFunction;
  expanded?: boolean;
  expandIcon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  children = null,
  className = '',
  expanded = false,
  expandIcon: expandIconProp = null,
  ...passedProps
}) => {
  const expandIcon: React.ReactNode =
    expandIconProp &&
    React.cloneElement(expandIconProp as React.ReactElement, {
      ...(expandIconProp as React.ReactElement).props,
      className: classNames(styles.expandIcon, { [styles.expanded]: expanded }),
    });

  return (
    <div {...passedProps} className={classNames(className, styles.Header)}>
      {isFunction(children) ? (
        children(expandIcon)
      ) : (
        <>
          {children}
          {expandIcon}
        </>
      )}
    </div>
  );
};

Header.displayName = 'ExpansionPanel.Header';

export default Header;
