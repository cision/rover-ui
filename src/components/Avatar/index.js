import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Addon from './Addon';
import style from './style.css';
import { sizeBase } from '../../shared/sizing';

const semanticSizes = {
  small: sizeBase * 5,
  medium: sizeBase * 7,
  large: sizeBase * 12,
};

const Avatar = ({
  size,
  loading,
  name,
  imageUrl,
  disabled,
  className,
  children,
  ...rest
}) => {
  const mainClassName = classNames(style.Avatar, className, {
    [style.loading]: loading,
    [style.disabled]: disabled && imageUrl,
    [style.disabledNoImage]: disabled && !imageUrl,
  });

  const sizes = useMemo(() => {
    const pixelSize = semanticSizes[size] || size;
    return {
      width: `${pixelSize}px`,
      height: `${pixelSize}px`,
      fontSize: `${pixelSize / 2}px`,
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
      {!loading && !imageUrl && initials}
      {children}
    </div>
  );
};

Avatar.Addon = Addon;

Avatar.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['small', 'medium', 'large']),
  ]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

Avatar.defaultProps = {
  loading: false,
  className: '',
  size: 'small',
  disabled: false,
  name: '',
  imageUrl: '',
  children: null,
};

export default Avatar;
