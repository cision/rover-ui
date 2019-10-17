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

  const initials = useMemo(() => {
    if (!name) return '';
    const nameParts = name.split(' ', 2);
    let returnInitials = '';
    nameParts.forEach(part => {
      returnInitials += part[0];
    });
    return returnInitials.slice(0, 2);
  }, [name]);

  const image = useMemo(() => {
    if (!imageUrl) return null;
    // Only load the image if the url response is 200
    try {
      const http = new XMLHttpRequest();
      http.open('HEAD', imageUrl, false);
      http.send();
      return http.status === 200 ? imageUrl : null;
    } catch (e) {
      return null;
    }
  }, [imageUrl]);

  const mainStyle = {
    ...sizes,
    backgroundImage: image && !loading ? `url(${image})` : undefined,
    ...rest.style,
  };

  return (
    <div
      className={mainClassName}
      aria-label={name ? `Profile image of ${name}` : ''}
      aria-hidden={!name}
      {...rest}
      style={mainStyle}
    >
      {!loading && !image && initials}
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
