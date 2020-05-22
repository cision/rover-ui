import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './Avatar.module.css';

const Addon = ({ position, offset, ...rest }) => {
  const positions = useMemo(() => {
    const p = position.split('-');
    return {
      [p[0]]: `${offset}px`,
      [p[1]]: `${offset}px`,
    };
  }, [position, offset]);

  const badgeClassNames = classNames(style.AvatarBadge, rest.className);
  return (
    <div
      {...rest}
      className={badgeClassNames}
      style={{ ...positions, ...rest.style }}
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
