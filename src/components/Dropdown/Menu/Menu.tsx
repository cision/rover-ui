import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';

import { isOpenContext } from '../context';
import styles from './Menu.module.css';
import ItemMoon from './Item/Item';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  position?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';
}

type MenuType = React.FC<MenuProps> & {
  Item: typeof ItemMoon;
};

const Menu: MenuType = ({
  className,
  isOpen: customIsOpen = undefined,
  position = 'bottomRight',
  ...passedProps
}) => {
  return (
    <isOpenContext.Consumer>
      {(isOpen) => (
        <Transition
          in={customIsOpen === undefined ? isOpen : customIsOpen}
          timeout={200}
          unmountOnExit
        >
          {(transitionState) => (
            <div
              {...passedProps}
              className={classNames(
                styles.Menu,
                className,
                styles[position],
                styles[transitionState]
              )}
            />
          )}
        </Transition>
      )}
    </isOpenContext.Consumer>
  );
};

Menu.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf([
    'topLeft',
    'topRight',
    'bottomRight',
    'bottomLeft',
  ]),
};

Menu.defaultProps = {
  className: '',
  isOpen: undefined,
  position: 'bottomRight',
};

Menu.Item = ItemMoon;

export default Menu;
