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
  min?: string;
  onSelectMenuItem: Function;
  showDropdown?: 'click' | 'focus';
  step?: number;
  stepFrom?: string;
  toggleAriaLabel?: string;
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

    const current =
      (stepFrom && getDateTimeFromShortTimeString(stepFrom)) ||
      getStartOfDay(new Date());
    const end = getEndOfDay(new Date());
    const maxAttempts = (SECONDS_PER_HOUR + SECONDS_PER_DAY) * 10; // 10 minute incremenents, buffer of an hour for daylight savings, plus 1 for start/end point.
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
        <Icon fill="currentColor" name="arrow-drop-down" />
      </Button>
    </EasyDropdown>
  );
};

export default Dropdown;
