import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Addon.module.css';

type TAddonSize = 'sm' | 'md' | 'lg';

export interface AddonProps {
  className?: string;
  size?: TAddonSize;
}

const Addon: React.FC<AddonProps> = ({
  className = '',
  size = 'md',
  ...passedProps
}) => (
  <div
    {...passedProps}
    className={classNames(className, styles.Addon, styles[size])}
  />
);

Addon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Addon.defaultProps = {
  className: '',
  size: 'md',
};

Addon.displayName = 'ButtonAddon';

export default Addon;
