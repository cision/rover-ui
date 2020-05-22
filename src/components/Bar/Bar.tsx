import React from 'react';
import classNames from 'classnames';

import styles from './Bar.module.css';

type BarProps = React.HTMLAttributes<HTMLDivElement>;
type BarType = React.FC<BarProps> & {
  Fill: React.FC<BarProps>;
};

const Bar: BarType = ({ className = '', ...props }) => (
  <div {...props} className={classNames(styles.Bar, className)} />
);

const Fill: React.FC<BarProps> = ({ className = '', ...props }) => (
  <div {...props} className={classNames(styles.Fill, className)} />
);

Fill.displayName = 'Bar.Fill';

Bar.Fill = Fill;

export default Bar;
