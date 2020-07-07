import React, { useMemo } from 'react';
import classNames from 'classnames';

import Button from '../../Button';
import EasyDropdown from '../../EasyDropdown';
import Icon from '../../Icon';

import {
  getDateTimeFromShortTimeString,
  getEndOfDay,
  getStartOfDay,
} from '../utils';

import styles from './Dropdown.module.css';

interface DropdownProps {
  className?: string;
  disabled?: boolean;
  max?: string;
  min?: string;
  value?: string;
  onSelectMenuItem: Function;
  showDropdown?: 'click' | 'focus';
  step?: number | string;
  toggleAriaLabel?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const Dropdown: React.FC<DropdownProps> = ({
  className = '',
  disabled,
  max,
  min,
  value,
  onSelectMenuItem,
  showDropdown,
  toggleAriaLabel = 'Toggle time dropdown',
  step: customStep,
}) => {
  const menuItems = useMemo(() => {
    if (!showDropdown) {
      return [];
    }

    let step = 0;

    // For html time pickers, step is a number of number of seconds between
    // increments in a number picker. For simplicity, we're setting steps in
    // minutes in the dropdown
    if (customStep) {
      let safeCustomStep: number;

      if (typeof customStep === 'number') {
        safeCustomStep = customStep;
      } else if (typeof customStep === 'string') {
        safeCustomStep = parseInt(customStep, 10);
      } else {
        safeCustomStep = 0;
      }

      step =
        safeCustomStep && !Number.isNaN(safeCustomStep) ? safeCustomStep : 0;
    }

    if (!step) {
      const currentMinute = parseInt(
        (value && value.split(':')?.[1]) ?? '00',
        10
      );

      step = [5, 10, 15, 30].reduce((result, increment) => {
        if (currentMinute && currentMinute % increment === 0) {
          result = increment * 60;
        }

        return result;
      }, 60 * 60);
    }

    const current = getStartOfDay(new Date());
    const end = getEndOfDay(new Date());
    const maxAttempts = 25 * 60 * 5; // 5 minute incremenents, buffer of an hour for daylight savings, plus 1 for start/end point.
    const maxDate = max ? getDateTimeFromShortTimeString(max) : undefined;
    const minDate = min ? getDateTimeFromShortTimeString(min) : undefined;
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

      if (
        (maxDate === undefined || current <= maxDate) &&
        (minDate === undefined || current >= minDate)
      ) {
        const currentCopy = new Date(current.valueOf());

        options.push({
          className: styles.menuItem,
          label,
          onClick: () => onSelectMenuItem({ target: { value: currentCopy } }),
        });
      }

      current.setSeconds(current.getSeconds() + step);
    } while (attempts <= maxAttempts && current < end);

    return options;
  }, [customStep, max, min, value, onSelectMenuItem, showDropdown]);

  return (
    <EasyDropdown
      className={classNames(className, styles.Dropdown)}
      disabled={disabled}
      isOpen={
        undefined /* Suppresses typescript lint warning about missing prop */
      }
      onToggle={() => {}}
      toggleProps={{
        disabled,
      }}
      defaultIsOpen={false}
      menuItems={menuItems}
      menuProps={{ position: 'bottomLeft' }}
    >
      <Button
        aria-label={toggleAriaLabel}
        className={styles.dropdownToggle}
        level="text"
        size="sm"
      >
        <Icon fill="currentColor" name="arrow-drop-down" />
      </Button>
    </EasyDropdown>
  );
};

export default Dropdown;
