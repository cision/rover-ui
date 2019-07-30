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

/*
 * SimpleComponent naming convention is deprecated due to confusion.
 * Use EasyComponent moving forward.
 */
export const SimpleTabMenu = ({ tabs, activeTab, size = 'sm', ...props }) => {
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

export const EasyTabMenu = SimpleTabMenu;

SimpleTabMenu.propTypes = {
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
SimpleTabMenu.defaultProps = {
  tabs: [],
  activeTab: '',
  size: 'md',
};

export default TabMenu;
