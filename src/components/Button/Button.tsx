import React, { useMemo } from 'react';
import classNames from 'classnames';

import Addon, { AddonProps } from './Addon/Addon';
import styles from './Button.module.css';
import { TButtonLevel, TButtonSize, TButtonState } from './types';

/*
  These 2 variants are in design docs but might not be "Buttons" in a strict sense.
  Filter (-> Should probably be a pill)
  Select (-> These might be better served as a different component)
*/

type TagType = {
  className?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

interface BaseButtonProps {
  circle?: boolean;
  className?: string;
  darkMode?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forwardedRef?: React.Ref<any>;
  hollow?: boolean;
  level?: TButtonLevel;
  size?: TButtonSize;
  tag?: React.FC<TagType> | React.ComponentType<TagType> | string | null;

  // States
  hover?: boolean;
  active?: boolean;
  disabled?: boolean;
  checked?: boolean;
  focus?: boolean;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Button props
export type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  BaseButtonProps & {
    href?: undefined;
  };

// Anchor props
export type AnchorElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseButtonProps & {
    href?: string;
  };

type ButtonType = React.FC<ButtonElementProps | AnchorElementProps> & {
  Addon: React.FC<AddonProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WithRef: any;
};

// Guard to check if href exists in props
const hasHref = (
  props: ButtonElementProps | AnchorElementProps
): props is AnchorElementProps => 'href' in props && props.href !== undefined;

// Design doc names in comments
export const levels: TButtonLevel[] = [
  'primary', // "Primary"
  'primary-alt', // "Teal"
  'secondary', // "Secondary"
  'tertiary', // "Tertiary"
  'success', // "Green"
  'danger', // "Red"
  'link', // "Blue"
  'text', // "Gray"
];

// These states are each their own boolean prop
export const states: TButtonState[] = [
  'hover', // "Hover"
  'focus', // "Focus"
  'active', // "Pressed"
  'disabled', // "Disabled"
  'checked', // "Active"
];

export const sizes: TButtonSize[] = [
  'sm', // ""
  'md', // "Medium"
  'lg', // "Large"
];

const Button: ButtonType = ({
  children: initChildren = null,
  circle = undefined,
  className: passedClassName = '',
  darkMode = false,
  forwardedRef,
  hollow = false,
  level = 'secondary',
  size = 'lg',
  tag: Tag = null,
  ...passedProps
}: ButtonElementProps | AnchorElementProps) => {
  const children = initChildren;

  // For future ref
  const truthyStateKeys = useMemo(
    () => states.filter((state) => !!passedProps[state]),
    [passedProps]
  );

  // Filter out undefined passedProps and `active` from DOM element tags
  // const safePassedProps = useMemo(
  //   () =>
  //     Object.entries(passedProps).reduce((result, [key, value]) => {
  //       if (value === undefined) {
  //         return result;
  //       }

  //       if (typeof Tag === 'string' && key === 'active') {
  //         return result;
  //       }

  //       return { ...result, [key]: value };
  //     }, {}),
  //   [passedProps, Tag]
  // );

  const className = useMemo(
    () =>
      classNames(
        passedClassName,
        styles.Button,
        styles[level],
        styles[size],
        {
          [styles.hollow]: hollow || darkMode,
          [styles.circle]: circle,
          [styles['primary-alt']]: level === 'teal', // For backwards compatibility with the old level name
        },
        /*
          In addition to "real" boolean props, this adds class names for
          'disabled', 'active', etc. so consumers can force appearance on
          elements easily
        */
        truthyStateKeys.map((truthyStateKey) => styles[truthyStateKey])
      ),
    [circle, darkMode, hollow, level, passedClassName, size, truthyStateKeys]
  );

  if (Tag) {
    return (
      <Tag {...passedProps} className={className} ref={forwardedRef}>
        {children}
      </Tag>
    );
  }

  if (hasHref(passedProps)) {
    return (
      <a {...passedProps} className={className} ref={forwardedRef}>
        {children}
      </a>
    );
  }

  // button render
  return (
    <button
      type="button"
      className={className}
      ref={forwardedRef}
      {...(passedProps as ButtonElementProps)}
    >
      {children}
    </button>
  );
};

Button.Addon = Addon;

Button.WithRef = React.forwardRef((props, ref) => (
  <Button {...props} forwardedRef={ref} />
));

export default Button;
