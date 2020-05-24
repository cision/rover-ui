import React from 'react';
import PropTypes from 'prop-types';
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
  isRound?: boolean | null;
}

const Badge: React.FC<BadgeProps> = ({
  className = '',
  tag: Tag = 'span',
  round = null,
  isRound = null,
  variant = '',
  ...rest
}) => {
  if (isRound === null && round !== null) {
    // eslint-disable-next-line no-console
    console.warn(
      "<Badge> prop 'round' is deprecated. Prefer to use 'isRound' in the same way."
    );
  }

  const classes = classNames(
    className,
    styles.Badge,
    { [styles.round]: isRound ?? round },
    buildVariantClasses(variants, variant)
  );

  return <Tag {...rest} className={classes} />;
};

Badge.defaultProps = {
  className: '',
  round: null,
  isRound: null,
  variant: '',
};

Badge.propTypes = {
  className: PropTypes.string,
  round: PropTypes.bool,
  isRound: PropTypes.bool,
  variant: PropTypes.oneOf<BadgeVariant>(variants),
};

export default Badge;
