import React, { useContext } from 'react';
import classNames from 'classnames';

import ButtonContext from '../Button.context';
import styles from './Addon.module.css';
import { TButtonSize } from '../types';

export interface AddonProps {
  className?: string;
  size?: TButtonSize;
}

const Addon: React.FC<AddonProps> = ({
  className = '',
  size: customSize,
  ...passedProps
}) => {
  const buttonContext = useContext(ButtonContext);

  const size = customSize || buttonContext.size || 'md';

  return (
    <div
      {...passedProps}
      className={classNames(className, styles.Addon, styles[size])}
    />
  );
};

Addon.displayName = 'ButtonAddon';

export default Addon;
