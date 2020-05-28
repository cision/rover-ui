import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Item from './Item';
import styles from './TabMenu.module.css';

const TabMenu = ({ align, className, ...props }) => {
  const tabMenuClass = classNames(
    styles.TabMenu,
    className,
    styles[`${align}Align`]
  );
  return <ul className={tabMenuClass} {...props} />;
};

TabMenu.Item = Item;
export const { itemPadding } = styles;

TabMenu.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
};
TabMenu.defaultProps = {
  align: 'left',
  className: '',
};

export const EasyTabMenu = ({ tabs, activeTab, size = 'sm', ...props }) => {
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

EasyTabMenu.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    }).isRequired
  ),
  activeTab: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
};

EasyTabMenu.defaultProps = {
  tabs: [],
  activeTab: '',
  size: 'md',
};

/*
 * SimpleComponent naming convention is deprecated due to confusion.
 * Use EasyComponent moving forward.
 */
export const SimpleTabMenu = EasyTabMenu;

export default TabMenu;
