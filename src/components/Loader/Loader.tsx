import React from 'react';

import classNames from 'classnames';

import styles from './Loader.module.css';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

const Loader: React.FC<LoaderProps> = ({ size = 'lg', ...rest }) => {
  const mainClass = classNames(styles.loader);
  const iconClass = classNames(
    styles['loader-icon'],
    styles[`size--${size}`],
    rest.className
  );

  const iconProp = {
    ...rest,
    className: iconClass,
  };

  return (
    <div className={mainClass}>
      <div {...iconProp} />
    </div>
  );
};

export default Loader;
