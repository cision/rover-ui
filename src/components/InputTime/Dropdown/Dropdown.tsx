import React, { useMemo } from 'react';
import classNames from 'classnames';

import Button from '../../Button';
import EasyDropdown from '../../EasyDropdown';
import Icon from '../../Icon';

import {
  SECONDS_PER_DAY,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../constants';

import {
  getDateTimeFromShortTimeString,
  getEndOfDay,
  getStartOfDay,
} from '../utils';

import styles from './Dropdown.module.css';

interface DropdownProps {
  className?: string;
  disabled?: boolean;
  formatTime?: (date: Date) => string;
  max?: string;
  menuProps?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  min?: string;
  onSelectMenuItem: Function;
  showDropdown?: 'click' | 'focus';
  step?: number;
  stepFrom?: string;
  timeZoneOffset?: number | null;
  toggleAriaLabel?: string;
  toggleProps?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  value?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const Dropdown: React.FC<DropdownProps> = ({
  className = '',
  disabled,
  formatTime,
  max,
  menuProps,
  min,
  onSelectMenuItem,
  passedProps,
  showDropdown,
  step: customStep,
  stepFrom,
  timeZoneOffset,
  toggleAriaLabel = 'Toggle time dropdown',
  toggleProps,
  value,
}) => {
  const menuItems = useMemo(() => {
    if (!showDropdown) {
      return [];
    }

    let step = customStep || 0;

    if (
      !step ||
      Number.isNaN(step) ||
      step < SECONDS_PER_MINUTE * 10 ||
      step > SECONDS_PER_DAY
    ) {
      step = 0;
    }

    if (!step) {
      const currentMinute = parseInt(
        (value && value.split(':')?.[1]) ?? '00',
        10
      );

      step = [10, 15, 30].reduce((result, increment) => {
        if (currentMinute && currentMinute % increment === 0) {
          result = increment * SECONDS_PER_MINUTE;
        }

        return result;
      }, SECONDS_PER_HOUR);
    }

    const current = stepFrom
      ? getDateTimeFromShortTimeString(stepFrom, { timeZoneOffset })
      : getStartOfDay(new Date(), { timeZoneOffset });

    const end = getEndOfDay(new Date(), { timeZoneOffset });

    const maxAttempts =
      // 1 day + 1 hour buffer for daylight savings, divided into 10-minute increments
      // because that's the shortest step the dropdown supports
      (SECONDS_PER_HOUR + SECONDS_PER_DAY) / (SECONDS_PER_MINUTE * 10);

    const maxDate = max
      ? getDateTimeFromShortTimeString(max, { timeZoneOffset })
      : undefined;

    const minDate = min
      ? getDateTimeFromShortTimeString(min, { timeZoneOffset })
      : undefined;

    const options: {
      className: string;
      label: string;
      onClick: Function;
    }[] = [];

    let attempts = 0;

    do {
      attempts += 1;

      const label =
        typeof formatTime === 'function'
          ? formatTime(current)
          : current.toLocaleTimeString([], {
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
  }, [
    customStep,
    formatTime,
    max,
    min,
    onSelectMenuItem,
    showDropdown,
    stepFrom,
    timeZoneOffset,
    value,
  ]);

  return (
    <EasyDropdown
      className={classNames(className, styles.Dropdown)}
      defaultIsOpen={false}
      disabled={disabled}
      isOpen={
        /*
          Explicit `undefined` suppresses typescript lint warning about missing prop.
          We want to pass undefined to preserve controlled behavior
        */
        undefined
      }
      menuItems={menuItems}
      menuProps={{
        className: styles.menu,
        position: 'bottomLeft',
        ...menuProps,
      }}
      onToggle={() => {}}
      toggleProps={toggleProps}
      {...passedProps}
    >
      <Button
        aria-label={toggleAriaLabel}
        className={styles.toggle}
        disabled={disabled}
        level="text"
        size="sm"
      >
        <Icon
          fill="currentColor"
          name="arrow-drop-down"
          style={{ display: 'block' }}
        />
      </Button>
    </EasyDropdown>
  );
};

export default Dropdown;
