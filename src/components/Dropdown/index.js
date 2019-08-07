import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.css';

import MenuMoon from './Menu';

export const isOpenContext = React.createContext(false);

const Dropdown = ({
  children,
  className,
  disabled,
  isOpen,
  onToggle,
  ...passedProps
}) => {
  const dropdown = React.createRef();

  const handleDocumentClick = React.useCallback(
    event => {
      const dropdownEl = dropdown && dropdown.current;

      // If the click was inside the dropdown, don't close it
      if (
        !dropdownEl ||
        (dropdownEl.contains(event.target) && dropdownEl !== event.target)
      ) {
        return;
      }

      onToggle(event);
    },
    [dropdown]
  );

  const handleKeyUp = React.useCallback(
    event => {
      // Escape key closes the dropdown
      if (event.key === 'Escape') {
        onToggle(event);
      }
    },
    [dropdown]
  );

  useEffect(() => {
    if (isOpen && !disabled) {
      document.addEventListener('click', handleDocumentClick, true);
      document.addEventListener('keyup', handleKeyUp);
    }

    if (!isOpen || disabled) {
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('keyup', handleKeyUp);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, onToggle]);

  return (
    <div
      {...passedProps}
      className={classNames(style.Dropdown, className, {
        [style.isOpen]: isOpen,
      })}
      ref={dropdown}
    >
      <isOpenContext.Provider value={isOpen && !disabled}>
        {children}
      </isOpenContext.Provider>
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  disabled: false,
  className: '',
  isOpen: false,
  onToggle: null,
};

export const Menu = MenuMoon;
Dropdown.Menu = Menu;

export default Dropdown;
