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
  hollow?: boolean;
  level?: TButtonLevel;
  outline?: boolean;
  size?: TButtonSize;
  tag?: React.FC<TagType> | React.ComponentType<TagType> | null;

  // States
  hover?: boolean;
  active?: boolean;
  disabled?: boolean;
  checked?: boolean;
  focus?: boolean;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Button props
type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  BaseButtonProps & {
    href?: undefined;
  };

// Anchor props
type AnchorElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseButtonProps & {
    href?: string;
  };

type ButtonType = React.FC<ButtonElementProps | AnchorElementProps> & {
  Addon: React.FC<AddonProps>;
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
  hollow: DEPRECATED_hollow = false,
  level = 'secondary',
  outline = false,
  size = 'lg',
  tag: Tag = null,
  ...passedProps
}: ButtonElementProps | AnchorElementProps) => {
  const children = initChildren;

  const truthyStateKeys = useMemo(
    () => states.filter((state) => !!passedProps[state]),
    [passedProps]
  );

  const className = useMemo(
    () =>
      classNames(
        passedClassName,
        styles.Button,
        styles[level],
        styles[size],
        {
          [styles['as-text']]: ['link', 'text'].indexOf(level) >= 0,
          [styles.circle]: circle,
          [styles.outline]: outline || DEPRECATED_hollow, // eslint-disable-line @typescript-eslint/camelcase
          [styles['primary-alt']]: level === 'teal', // For backwards compatibility with the old level name
        },
        /*
          In addition to "real" boolean props, this adds class names for
          'disabled', 'active', etc. so consumers can force appearance on
          elements easily
        */
        truthyStateKeys.map((truthyStateKey) => styles[truthyStateKey])
      ),
    [
      circle,
      DEPRECATED_hollow, // eslint-disable-line @typescript-eslint/camelcase
      level,
      outline,
      passedClassName,
      size,
      truthyStateKeys,
    ]
  );

  if (Tag) {
    return (
      <Tag {...passedProps} className={className}>
        {children}
      </Tag>
    );
  }

  if (hasHref(passedProps)) {
    return (
      <a {...passedProps} className={className}>
        {children}
      </a>
    );
  }

  // button render
  return (
    <button
      type="button"
      className={className}
      {...(passedProps as ButtonElementProps)}
    >
      {children}
    </button>
  );
};

Button.Addon = Addon;

export default Button;
