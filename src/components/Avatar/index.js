import React, { useMemo, useEffect, useState } from 'react';
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

  const [loadedImageUrl, setLoadedImageUrl] = useState(null);

  const initials = useMemo(() => {
    if (!name) return '';
    const nameParts = name.split(' ', 2);
    let returnInitials = '';
    nameParts.forEach(part => {
      returnInitials += part[0];
    });
    return returnInitials.slice(0, 2);
  }, [name]);

  useEffect(() => {
    if (!imageUrl) return () => {};

    setLoadedImageUrl(null);

    const img = new Image();
    img.onload = function() {
      if ('naturalHeight' in this) {
        if (this.naturalHeight + this.naturalWidth === 0) {
          return;
        }
      } else if (this.width + this.height === 0) {
        return;
      }

      setLoadedImageUrl(imageUrl);
    };
    img.onerror = function() {
      setLoadedImageUrl(null);
    };
    img.src = imageUrl;

    return () => {
      img.onload = () => {};
      img.onerror = () => {};
      // Not cancelling the request by setting img.src to null so image can
      // be cached for future usage
    };
  }, [imageUrl]);

  const mainStyle = {
    ...sizes,
    backgroundImage:
      loadedImageUrl && !loading ? `url(${loadedImageUrl})` : undefined,
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
      {!loading && !loadedImageUrl && initials}
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
