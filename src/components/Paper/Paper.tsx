import React from 'react';
import classNames from 'classnames';

import styles from './Paper.module.css';

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  flat?: boolean;
  squared?: boolean;
}

const Paper: React.FC<PaperProps> = ({
  className = '',
  flat = false,
  squared = false,
  ...rest
}) => {
  const classname = classNames(styles.Paper, className, {
    [styles.flat]: flat,
    [styles.squared]: squared,
  });
  return <div {...rest} className={classname} />;
};

export default Paper;
