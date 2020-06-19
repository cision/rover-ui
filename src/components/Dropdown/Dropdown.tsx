import React, { useEffect } from 'react';
import classNames from 'classnames';

import styles from './Dropdown.module.css';

import Menu from './Menu';

import { isOpenContext } from './context';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  isOpen?: boolean;
  onToggle?: (e: MouseEvent | KeyboardEvent) => void;
}

type DropdownType = React.FC<DropdownProps> & {
  Menu: typeof Menu;
};

const Dropdown: DropdownType = ({
  children,
  className = '',
  disabled = false,
  isOpen = false,
  onToggle = () => {},
  ...passedProps
}) => {
  const dropdown = React.createRef<HTMLDivElement>();

  const handleDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      const dropdownEl = dropdown?.current;

      // If the click was inside the dropdown, don't close it
      if (
        !dropdownEl ||
        (dropdownEl.contains(event.target as HTMLDivElement) &&
          dropdownEl !== event.target)
      ) {
        return;
      }

      onToggle(event);
    },
    [dropdown, onToggle]
  );

  const handleKeyUp = React.useCallback(
    (event: KeyboardEvent) => {
      // Escape key closes the dropdown
      if (event.key === 'Escape') {
        onToggle(event);
      }
    },
    [onToggle]
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
  }, [disabled, handleDocumentClick, handleKeyUp, isOpen, onToggle]);

  return (
    <div
      {...passedProps}
      className={classNames(styles.Dropdown, className, {
        [styles.isOpen]: isOpen,
      })}
      ref={dropdown}
    >
      <isOpenContext.Provider value={isOpen && !disabled}>
        {children}
      </isOpenContext.Provider>
    </div>
  );
};

Dropdown.Menu = Menu;

export default Dropdown;
