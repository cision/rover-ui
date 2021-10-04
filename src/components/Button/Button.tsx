import React, { useMemo } from 'react';
import classNames from 'classnames';

import Context from './Button.context';
import Addon, { AddonProps } from './Addon/Addon';
import styles from './Button.module.css';
import { TButtonLevel, TButtonSize, TButtonState } from './types';

/*
  These 2 variants are in design docs but might not be "Buttons" in a strict sense.
  Filter (-> Should probably be a pill)
  Select (-> These might be better served as a different component)
*/

type CustomTagType = {
  className?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

type TagType =
  | React.FC<CustomTagType>
  | React.ComponentType<CustomTagType>
  | string
  | null;

interface BaseButtonProps {
  circle?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forwardedRef?: React.Ref<any>;
  hollow?: boolean;
  level?: TButtonLevel;
  outline?: boolean;
  size?: TButtonSize;
  tag?: TagType;

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
  forwardedRef,
  hollow: DEPRECATED_hollow = false,
  level = 'secondary',
  outline = false,
  size = 'lg',
  tag = null,
  ...passedProps
}: ButtonElementProps | AnchorElementProps) => {
  const children = React.Children.map(initChildren, (child) =>
    typeof child === 'string' ? <span>{child}</span> : child
  );

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

  let Tag: TagType = 'button';

  if (tag) {
    Tag = tag;
  } else if (hasHref(passedProps)) {
    Tag = 'a';
  }

  return (
    <Context.Provider value={{ size }}>
      <Tag
        className={className}
        ref={forwardedRef}
        type={Tag === 'button' ? 'button' : undefined}
        {...passedProps}
      >
        {children}
      </Tag>
    </Context.Provider>
  );
};

Button.Addon = Addon;

Button.WithRef = React.forwardRef((props, ref) => (
  <Button {...props} forwardedRef={ref} />
));

export default Button;
