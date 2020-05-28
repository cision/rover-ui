import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Addon, { AddonProps } from './Addon';
import styles from './Avatar.module.css';
import { sizeBase } from '../../shared/sizing';

const semanticSizes = {
  small: sizeBase * 5,
  medium: sizeBase * 7,
  large: sizeBase * 12,
};

type TOnErrorArgs = Error | Event | string | null;
type ImageFetcherArgs = {
  onLoad: (src: string | null) => void;
  onError: (e: TOnErrorArgs) => void;
  src: string | null;
};

// This function will be used in a useEffect so make sure it returns a cleanup function
function defaultImageFetcher({
  onLoad,
  onError,
  src,
}: ImageFetcherArgs): () => void {
  const img = new Image();
  img.referrerPolicy = 'no-referrer';
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    const image = this as HTMLImageElement;
    if ('naturalHeight' in this) {
      if (image.naturalHeight + image.naturalWidth === 0) {
        onError(new Error('Invalid Image'));
        return;
      }
    } else if (image.width + image.height === 0) {
      onError(new Error('Invalid Image'));
      return;
    }

    onLoad(src);
  };
  img.onerror = function (e) {
    onError(e);
  };
  if (src) img.src = src;

  return () => {
    img.onload = () => {};
    img.onerror = () => {};
    // Not cancelling the request by setting img.src to null so image can
    // be cached for future usage
  };
}

interface AvatarProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  size?: number | string | 'small' | 'medium' | 'large' | null | undefined;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  name?: string;
  imageUrl?: string | null;
  className?: string;
  onLoad?: (src: string | null) => void;
  onError?: (e: TOnErrorArgs) => void;
  imageFetcher?: (opts: ImageFetcherArgs) => void;
}

type AvatarType = React.FC<AvatarProps> & {
  Addon: React.FC<AddonProps>;
};

const Avatar: AvatarType = ({
  size = 'small',
  loading = false,
  name = '',
  imageUrl = '',
  disabled = false,
  className = '',
  children = null,
  onLoad = null,
  onError = null,
  imageFetcher = defaultImageFetcher,
  ...rest
}) => {
  const mainClassName = classNames(styles.Avatar, className, {
    [styles.loading]: loading,
    [styles.disabled]: disabled && imageUrl,
    [styles.disabledNoImage]: disabled && !imageUrl,
  });

  const sizes = useMemo(() => {
    const pixelSize = size ? semanticSizes[size] || size : semanticSizes.small;
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
    const handleLoad = (src: string | null) => {
      setLoaded(true);
      if (onLoad) onLoad(src);
    };

    const handleError = (e: TOnErrorArgs) => {
      setLoaded(false);
      if (onError) onError(e);
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
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  imageFetcher: PropTypes.func,
  imageUrl: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['small', 'medium', 'large']),
  ]),
};

Avatar.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  imageFetcher: defaultImageFetcher,
  imageUrl: '',
  loading: false,
  name: '',
  onError: () => {},
  onLoad: () => {},
  size: 'small',
};

export default Avatar;
