import React from 'react';

import DayPicker from 'react-day-picker';
import { DayPickerProps } from 'react-day-picker/types/Props';

import 'react-day-picker/lib/style.css';
import { ClassNames } from 'react-day-picker/types/ClassNames';
import styles from './DatePicker.module.css';

interface DatePickerProps extends Omit<DayPickerProps, 'classNames'> {
  classNames?: {
    container?: string;
    wrapper?: string;
    interactionDisabled?: string;
    navBar?: string;
    navButtonPrev?: string;
    navButtonNext?: string;
    navButtonInteractionDisabled?: string;
    months?: string;
    month?: string;
    caption?: string;
    weekdays?: string;
    weekdaysRow?: string;
    weekday?: string;
    weekNumber?: string;
    body?: string;
    week?: string;
    day?: string;
    footer?: string;
    todayButton?: string;
    today?: string;
    selected?: string;
    disabled?: string;
    outside?: string;
  };
}

const DatePicker: React.FC<DatePickerProps> = ({ ...passedProps }) => {
  const styleOverride = {
    container: styles.container,
    wrapper: styles.wrapper,
    interactionDisabled: styles.interactionDisabled,
    navBar: styles.navBar,
    navButtonPrev: styles.navButtonPrev,
    navButtonNext: styles.navButtonNext,
    navButtonInteractionDisabled: styles.navButtonInteractionDisabled,
    months: styles.months,
    month: styles.month,
    caption: styles.caption,
    weekdays: styles.weekdaysBody,
    weekdaysRow: styles.weekdaysRow,
    weekday: styles.weekday,
    weekNumber: styles.weekNumber,
    body: styles.body,
    week: styles.week,
    day: styles.day,
    footer: styles.footer,
    todayButton: styles.todayButton,
    today: styles.today,
    selected: styles.selected,
    disabled: styles.disabled,
    outside: styles.outside,
  } as ClassNames;

  if (passedProps.classNames) {
    Object.entries(passedProps.classNames).forEach((classes) => {
      if (classes.length === 2) {
        styleOverride[classes[0]] = `${styleOverride[classes[0]]} ${
          classes[1]
        }`;
      }
    });
  }

  return <DayPicker {...passedProps} classNames={styleOverride} />;
};

export default DatePicker;
