import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.css';

const semanticSizes = {
  small: 40,
  medium: 60,
  large: 100,
};

const Avatar = ({
  size,
  loading,
  name,
  imageUrl,
  className,
  children,
  ...rest
}) => {
  const mainClassName = classNames(style.Avatar, className, {
    [style.loading]: loading,
  });

  const sizes = useMemo(() => {
    const pixelSize = semanticSizes[size] || size;
    return {
      width: `${pixelSize}px`,
      height: `${pixelSize}px`,
    };
  }, [size]);

  const mainStyle = {
    ...sizes,
    backgroundImage: imageUrl && !loading ? `url(${imageUrl})` : undefined,
  };

  const initials = useMemo(() => {
    if (!name) return '';
    const nameParts = name.split(' ', 2);
    let returnInitials = '';
    nameParts.forEach(part => {
      returnInitials += part[0];
    });
    return returnInitials.slice(0, 2);
  }, [name]);

  return (
    <div className={mainClassName} {...rest} style={mainStyle}>
      {!loading && !imageUrl && <div className={style.inner}>{initials}</div>}
      {children}
    </div>
  );
};

const Addon = ({ position, offset, ...rest }) => {
  const positions = useMemo(() => {
    const p = position.split('-');
    return {
      [p[0]]: offset,
      [p[1]]: offset,
    };
  }, [position, offset]);
  const badgeClassNames = classNames(style.AvatarBadge, rest.className);
  return <div {...rest} className={badgeClassNames} style={positions} />;
};

Addon.propTypes = {
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-right',
    'bottom-left',
  ]),
  offset: PropTypes.number,
};

Addon.defaultProps = {
  position: 'bottom-right',
  offset: 0,
};

Avatar.Addon = Addon;

Avatar.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['small', 'medium', 'large']),
  ]),
  loading: PropTypes.bool,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

Avatar.defaultProps = {
  loading: false,
  className: '',
  size: 'small',
  name: '',
  imageUrl: '',
  children: null,
};

export default Avatar;
