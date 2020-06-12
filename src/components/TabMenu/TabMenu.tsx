import React from 'react';
import classNames from 'classnames';

import Item from './Item';
import styles from './TabMenu.module.css';
import { ItemProps } from './Item/Item';

interface TabMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  align?: 'left' | 'center' | 'right';
  className?: string;
}

type TabMenuType = React.FC<TabMenuProps> & {
  Item: React.FC<ItemProps>;
};

const TabMenu: TabMenuType = ({ align = 'left', className = '', ...props }) => {
  const tabMenuClass = classNames(
    styles.TabMenu,
    className,
    styles[`${align}Align`]
  );
  return <ul className={tabMenuClass} {...props} />;
};

TabMenu.Item = Item;
export const { itemPadding } = styles;

export type EasyTabType = {
  key: string;
  label: string;
  onClick: (e: React.SyntheticEvent) => void;
};
export interface EasyTabMenuProps extends TabMenuProps {
  tabs?: EasyTabType[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  activeTab?: string;
}

export const EasyTabMenu: React.FC<EasyTabMenuProps> = ({
  tabs = [],
  activeTab = '',
  size = 'md',
  ...props
}) => {
  return (
    <TabMenu {...props}>
      {tabs.map((tab) => {
        const inner = classNames(
          styles.itemPadding,
          styles[`${size}TextSize`],
          {
            [styles.activeButton]: tab.key === activeTab,
          }
        );
        return (
          <Item key={tab.key} active={tab.key === activeTab}>
            <button type="button" className={inner} onClick={tab.onClick}>
              {tab.label}
            </button>
          </Item>
        );
      })}
    </TabMenu>
  );
};

export default TabMenu;
