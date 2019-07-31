import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Item from './Item';
import style from './style.css';

const TabMenu = ({ align, className, ...props }) => {
  const tabMenuClass = classNames(
    style.TabMenu,
    className,
    style[`${align}Align`]
  );
  return <ul className={tabMenuClass} {...props} />;
};

TabMenu.Item = Item;
export const itemPadding = style.itemPadding;

TabMenu.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
};
TabMenu.defaultProps = {
  align: 'left',
  className: '',
};

export const EasyTabMenu = ({ tabs, activeTab, size = 'sm', ...props }) => {
  const inner = classNames(style.itemPadding, style[`${size}TextSize`]);
  return (
    <TabMenu {...props}>
      {tabs.map(tab => (
        <Item key={tab.key} active={tab.key === activeTab}>
          <button className={inner} onClick={tab.onClick}>
            {tab.label}
          </button>
        </Item>
      ))}
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
