import React from 'react';

import classNames from 'classnames';

import styles from './Loader.module.css';

export type Size = 'sm' | 'md' | 'lg' | 'xl';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

const Loader: React.FC<LoaderProps> = ({ size = 'lg', ...rest }) => {
  const mainClass = classNames(
    styles.Loader,
    rest.className,
    `${styles[size]}`
  );

  const prop = {
    ...rest,
    className: mainClass,
  };

  return <div {...prop} />;
};

export default Loader;
