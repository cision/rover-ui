import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.module.css';

const Avatar = ({ className, loading, name, size, disabled, badge, url }) => {
  const [mainElement, setMainElement] = useState(<span />);
  const [loadError, setLoadError] = useState(false);

  const formatInitials = nameToShorten => {
    if (!nameToShorten) return '';
    const nameParts = nameToShorten.split(' ', 2);
    let initialsHolder = '';
    nameParts.forEach(part => {
      initialsHolder += part[0];
    });

    return initialsHolder.slice(0, 2);
  };

  useEffect(() => {
    console.log(loadError, url);

    if (loading) {
      setMainElement(<span />);
    } else if (!loadError && url) {
      setMainElement(
        <img src={url} alt={name} onError={() => setLoadError(true)} />
      );
    } else {
      setMainElement(
        <span className={style.initials}>{formatInitials(name)}</span>
      );
    }
  }, [loading, loadError, name, url]);

  return (
    <div className={classNames(className, style[size], style.Avatar)}>
      {mainElement}
      <div className="badger">{badge}</div>
    </div>
  );
};

export const badgePositions = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left',
];

export const avatarSizes = ['small', 'normal', 'large'];

Avatar.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(avatarSizes),
  badge: PropTypes.node,
  badgePosition: PropTypes.oneOf(badgePositions),
  disabled: PropTypes.bool,
  url: PropTypes.string,
};

Avatar.defaultProps = {
  className: '',
  size: 'normal',
  badge: null,
  badgePosition: 'bottom-left',
  disabled: false,
  url: '',
};

export default Avatar;
