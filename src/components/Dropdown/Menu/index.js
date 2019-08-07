import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';

import { isOpenContext } from '../';
import style from './style.css';
import ItemMoon from './Item';

const Menu = ({
  className,
  isOpen: customIsOpen,
  position,
  ...passedProps
}) => {
  return (
    <isOpenContext.Consumer>
      {isOpen => (
        <Transition
          in={customIsOpen === undefined ? isOpen : customIsOpen}
          timeout={200}
          unmountOnExit
        >
          {transitionState => (
            <div
              {...passedProps}
              className={classNames(
                style.Menu,
                className,
                style[position],
                style[transitionState]
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

export const Item = ItemMoon;
Menu.Item = Item;

export default Menu;
