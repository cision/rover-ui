import React from 'react';
import classNames from 'classnames';

import styles from './Item.module.css';

export interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
}

const Item: React.FC<ItemProps> = ({
  className: customClassName,
  active = false,
  children,
  onClick = () => {},
  ...props
}) => {
  // NOTE: "Using the 'active' className on a TabMenu.Item child is deprecated. Use <TabMenu.Item active> instead."
  const isChildActive = (child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      return child.props?.className?.indexOf('active') >= 0;
    }
    return false;
  };

  const className = classNames(styles.Item, customClassName, {
    [styles.active]: active || isChildActive(children),
  });
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
};

export default Item;
