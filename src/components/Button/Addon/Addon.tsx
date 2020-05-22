import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Addon.module.css';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export interface AddonProps {
  className?: string;
  size?: string;
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

Addon.propTypes = propTypes;

Addon.defaultProps = {
  className: '',
  size: 'md',
};

Addon.displayName = 'ButtonAddon';

export default Addon;
