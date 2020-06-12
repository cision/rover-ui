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
  const isChildActive = (child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      const activeChild = child.props?.className?.indexOf('active') >= 0;
      if (activeChild) {
        console.warn(
          "Using the 'active' className on a TabMenu.Item child is deprecated. Use <TabMenu.Item active> instead."
        );
      }
      return activeChild;
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
