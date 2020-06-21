import React, { useMemo } from 'react';
import classNames from 'classnames';

import Button from '../../Button';
import EasyDropdown from '../../EasyDropdown';
import Icon from '../../Icon';

import { getEndOfDay, getStartOfDay } from '../utils';

import styles from './Dropdown.module.css';

interface DropdownProps {
  className?: string;
  onSelectMenuItem: Function;
  showDropdown?: 'click' | 'focus';
  step?: number | string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const Dropdown: React.FC<DropdownProps> = ({
  className = '',
  onSelectMenuItem,
  showDropdown,
  step,
  ...passedProps
}) => {
  console.log({ passedProps });

  const menuItems = useMemo(() => {
    if (!showDropdown) {
      return [];
    }

    let menuStep = typeof step === 'string' ? parseInt(step, 10) : step;
    menuStep = menuStep || 60 * 60; // One hour, in secords
    const current = getStartOfDay(new Date());
    const end = getEndOfDay(new Date());
    const maxAttempts = 25 * 60 * 5; // 5 minute incremenents, buffer of an hour for daylight savings, plus 1 for start/end point.
    let attempts = 0;

    const options: {
      className: string;
      label: string;
      onClick: Function;
    }[] = [];

    do {
      attempts += 1;

      const label = current.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      });

      const currentCopy = new Date(current.valueOf());

      options.push({
        className: styles.menuItem,
        label,
        onClick: () => onSelectMenuItem({ target: { value: currentCopy } }),
      });

      current.setSeconds(current.getSeconds() + menuStep);
    } while (attempts <= maxAttempts && current < end);

    return options;
  }, [onSelectMenuItem, showDropdown, step]);

  return (
    <EasyDropdown
      className={classNames(className, styles.Dropdown)}
      disabled={false}
      isOpen={undefined}
      onToggle={() => {}}
      toggleProps={undefined}
      defaultIsOpen={false}
      menuItems={menuItems}
      menuProps={{ position: 'bottomLeft' }}
    >
      <Icon className={styles.icon} fill="currentColor" name="clock" />
      <Button className={styles.dropdownToggle} level="text" size="sm">
        <Icon fill="currentColor" name="arrow-drop-down" />
      </Button>
    </EasyDropdown>
  );
};

export default Dropdown;
