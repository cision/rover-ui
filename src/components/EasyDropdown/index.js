import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../Button';
import Dropdown from '../Dropdown';

import styles from './EasyDropdown.module.css';

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
    (event) => {
      if (!isControlled) {
        setUncontrolledIsOpen(!uncontrolledIsOpen);
      }

      parentOnToggle(event);
    },
    [isControlled, parentOnToggle, uncontrolledIsOpen]
  );

  const children = useMemo(() => {
    const childrenArray = React.Children.toArray(initChildren);
    const hasStringChildren = childrenArray.reduce(
      (result, child) => result || typeof child === 'string',
      false
    );

    /*
      If any children are raw strings, wrap all the children in a <Button />
      Otherwise, assume there's a custom toggle component, and clone it with
      added props for behavior.
    */
    return hasStringChildren ? (
      <Button {...toggleProps} data-is-open={isOpen} onClick={onToggle}>
        {initChildren}
      </Button>
    ) : (
      React.Children.map(initChildren, (child) =>
        React.cloneElement(child, {
          ...toggleProps,
          className: classNames(
            child && child.props && child.props.className,
            toggleProps.className
          ),
          'data-is-open': isOpen,
          onClick: (event) => {
            onToggle(event);

            if (child && child.props && child.props.onClick) {
              child.props.onClick(event);
            }
          },
        })
      )
    );
  }, [initChildren, isOpen, onToggle, toggleProps]);

  return (
    <Dropdown
      {...passedProps}
      className={classNames(className, styles.EasyDropdown)}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      {children}
      {!!menuItems.length && (
        <Dropdown.Menu {...menuProps}>
          {Object.keys(menuItemGroups).map((group) => {
            return (
              <div
                className={classNames({
                  [styles.group]: group.indexOf('_ungrouped-') !== 0,
                  [styles.single]: group.indexOf('_ungrouped-') === 0,
                })}
                key={group}
              >
                {menuItemGroups[group].map(
                  ({ children: itemChildren, label, ...itemProps }) => (
                    <Dropdown.Menu.Item
                      {...itemProps}
                      key={label}
                      onClick={(event) => {
                        // Clicking a menu item has the side effect of closing the menu
                        if (!isControlled) {
                          setUncontrolledIsOpen(false);
                        }
                        // Call the item's onClick event too, for the consumer to observe
                        if (itemProps.onClick) {
                          itemProps.onClick(event);
                        }
                      }}
                    >
                      {itemChildren || label}
                    </Dropdown.Menu.Item>
                  )
                )}
              </div>
            );
          })}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

EasyDropdown.propTypes = {
  /** Pass a custom node if you want to control the toggle fully. */
  children: PropTypes.node,
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
  menuProps: PropTypes.object,
  /** Without `defaultIsOpen`, `onToggle` is the only way to set state. With it, it's a convenience callback. */
  onToggle: PropTypes.func,
  toggleProps: PropTypes.shape({
    className: PropTypes.string,
  }),
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
  toggleProps: {
    className: '',
  },
};

export default EasyDropdown;
