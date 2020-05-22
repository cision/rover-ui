import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Avatar.module.css';

export interface AddonProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: string;
  offset?: number;
}

const Addon: React.FC<AddonProps> = ({
  position = 'bottom-right',
  offset = 0,
  className = '',
  style = {},
  ...rest
}) => {
  const positions = useMemo(() => {
    const p = position.split('-');
    return {
      [p[0]]: `${offset}px`,
      [p[1]]: `${offset}px`,
    };
  }, [position, offset]);

  const badgeClassNames = classNames(styles.AvatarBadge, className);
  return (
    <div
      {...rest}
      className={badgeClassNames}
      style={{ ...positions, ...style }}
    />
  );
};

Addon.propTypes = {
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-right',
    'bottom-left',
    'left-top',
    'right-top',
    'left-bottom',
    'right-bottom',
  ]),
  offset: PropTypes.number,
};

Addon.defaultProps = {
  position: 'bottom-right',
  offset: 0,
};

export default Addon;
