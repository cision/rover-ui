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
  const className = classNames(styles.Item, customClassName, {
    [styles.active]: active || children,
  });
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
};

export default Item;
