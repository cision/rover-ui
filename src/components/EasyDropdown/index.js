import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../Button';
import Dropdown, { Menu } from '../Dropdown';

import style from './style.css';

const EasyDropdown = ({
  children: initChildren,
  className,
  defaultIsOpen,
  disabled,
  isOpen: controlledIsOpen,
  menuItems,
  menuProps,
  onToggle: parentOnToggle,
  toggleProps,
  ...passedProps
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultIsOpen);
  const isControlled = defaultIsOpen === undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // Group menu items while preserving their order.
  const menuItemGroups = useMemo(
    () =>
      menuItems.reduce((result, item) => {
        let groupId = item.group;

        if (!groupId) {
          // For easy iterating, ungrouped items are put in groups of one
          groupId = `_ungrouped-${item.label}`;
        }

        result[groupId] = result[groupId] || [];
        result[groupId].push(item);
        return result;
      }, {}),
    [menuItems]
  );

  const onToggle = useCallback(
    event => {
      if (!isControlled) {
        setUncontrolledIsOpen(!uncontrolledIsOpen);
      }

      parentOnToggle(event);
    },
    [defaultIsOpen, parentOnToggle, setUncontrolledIsOpen, uncontrolledIsOpen]
  );

  const children = useMemo(() => {
    return typeof initChildren === 'string' ? (
      <Button
        className={classNames(toggleProps.className, style.toggle)}
        data-is-open={isOpen}
        onClick={onToggle}
      >
        {initChildren}
      </Button>
    ) : (
      React.Children.map(initChildren, child =>
        React.cloneElement(child, {
          className: classNames(
            child && child.props && child.props.className,
            toggleProps.className,
            style.toggle
          ),
          'data-is-open': isOpen,
          onClick: event => {
            onToggle(event);

            if (child && child.props && child.props.onClick) {
              child.props.onClick(event);
            }
          },
        })
      )
    );
  }, [initChildren, isOpen, onToggle]);

  return (
    <Dropdown
      {...passedProps}
      className={classNames(className, style.EasyDropdown)}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      {children}
      {!!menuItems.length && (
        <Menu {...menuProps}>
          {Object.keys(menuItemGroups).map(group => {
            return (
              <div
                className={classNames({
                  [style.group]: group.indexOf('_ungrouped-') !== 0,
                  [style.single]: group.indexOf('_ungrouped-') === 0,
                })}
                key={group}
              >
                {menuItemGroups[group].map(
                  ({ children: itemChildren, label, ...itemProps }) => (
                    <Menu.Item {...itemProps} key={label}>
                      {itemChildren || label}
                    </Menu.Item>
                  )
                )}
              </div>
            );
          })}
        </Menu>
      )}
    </Dropdown>
  );
};

EasyDropdown.propTypes = {
  /** Pass a custom node if you want to control the toggle fully. */
  children: PropTypes.node.isRequired,
  /** Totally optional, for additional styling */
  className: PropTypes.string,
  /** If defaultIsOpen is provided, the component will run in "uncontrolled" mode */
  defaultIsOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  /** Without `defaultIsOpen`, `isOpen` fully controls the dropdown state */
  isOpen: PropTypes.bool,
  /** An array of items that comprise the menu */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      /** Children will be rendered instead of the label, if provided */
      children: PropTypes.node,
      /** If you provide group IDs, the menu items will be grouped with dividers between them. */
      group: PropTypes.string,
      /** This will be the array key and the fallback contents */
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  menuProps: PropTypes.shape({ ...Menu.propTypes }),
  /** Without `defaultIsOpen`, `onToggle` is the only way to set state. With it, it's a convenience callback. */
  onToggle: PropTypes.func,
  toggleProps: PropTypes.object,
};

EasyDropdown.defaultProps = {
  children: undefined,
  className: '',
  defaultIsOpen: undefined,
  disabled: false,
  isOpen: undefined,
  menuItems: [],
  menuProps: {
    position: 'bottomRight',
  },
  onToggle: () => {},
  toggleProps: {},
};

export default EasyDropdown;
