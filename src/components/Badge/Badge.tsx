import React from 'react';
import classNames from 'classnames';

import styles from './Badge.module.css';

type BadgeVariant =
  | 'dark'
  | 'danger'
  | 'notify'
  | 'warning'
  | 'info'
  | 'success'
  | '';

export const variants: BadgeVariant[] = [
  'dark',
  'danger',
  'notify',
  'warning',
  'info',
  'success',
  '',
];

const buildVariantClasses = (list: BadgeVariant[], variant: BadgeVariant) =>
  list.reduce((acc, item) => {
    acc[styles[item]] = variant === item;
    return acc;
  }, {});

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  className?: string;
  tag?: keyof Pick<JSX.IntrinsicElements, 'div' | 'span'>;
  variant?: BadgeVariant;
  round?: boolean | null;
}

const Badge: React.FC<BadgeProps> = ({
  className = '',
  tag: Tag = 'span',
  round = null,
  variant = '',
  ...rest
}) => {
  const classes = classNames(
    className,
    styles.Badge,
    { [styles.round]: round },
    buildVariantClasses(variants, variant)
  );

  return <Tag {...rest} className={classes} />;
};

export default Badge;
