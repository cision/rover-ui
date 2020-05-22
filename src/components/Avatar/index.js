import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Addon from './Addon';
import style from './Avatar.module.css';
import { sizeBase } from '../../shared/sizing';

const semanticSizes = {
  small: sizeBase * 5,
  medium: sizeBase * 7,
  large: sizeBase * 12,
};

// This function will be used in a useEffect so make sure it returns a cleanup function
function defaultImageFetcher({ onLoad, onError, src }) {
  const img = new Image();
  img.referrerPolicy = 'no-referrer';
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    if ('naturalHeight' in this) {
      if (this.naturalHeight + this.naturalWidth === 0) {
        onError(new Error('Invalid Image'));
        return;
      }
    } else if (this.width + this.height === 0) {
      onError(new Error('Invalid Image'));
      return;
    }

    onLoad(src);
  };
  img.onerror = function (e) {
    onError(e);
  };
  img.src = src;

  return () => {
    img.onload = () => {};
    img.onerror = () => {};
    // Not cancelling the request by setting img.src to null so image can
    // be cached for future usage
  };
}

const Avatar = ({
  size,
  loading,
  name,
  imageUrl,
  disabled,
  className,
  children,
  onLoad,
  onError,
  imageFetcher,
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

  const [loaded, setLoaded] = useState(false);

  const initials = useMemo(() => {
    if (!name) return '';
    const nameParts = name.split(' ', 2);
    let returnInitials = '';
    nameParts.forEach((part) => {
      returnInitials += part[0];
    });
    return returnInitials.slice(0, 2);
  }, [name]);

  useEffect(() => {
    if (!imageUrl) return () => {};

    setLoaded(false);
    const handleLoad = (src) => {
      setLoaded(true);
      onLoad(src);
    };
    const handleError = (e) => {
      setLoaded(false);
      onError(e);
    };
    return imageFetcher({
      onLoad: handleLoad,
      onError: handleError,
      src: imageUrl,
    });
  }, [imageFetcher, imageUrl, onError, onLoad]);

  const mainStyle = {
    ...sizes,
    backgroundImage: loaded && !loading ? `url(${imageUrl})` : undefined,
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
      {!loading && !loaded && initials}
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
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  imageFetcher: PropTypes.func,
};

Avatar.defaultProps = {
  loading: false,
  className: '',
  size: 'small',
  disabled: false,
  name: '',
  imageUrl: '',
  children: null,
  onLoad: () => {},
  onError: () => {},
  imageFetcher: defaultImageFetcher,
};

export default Avatar;
