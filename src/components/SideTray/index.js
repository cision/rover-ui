import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.css';

const SideTray = ({ visible, closeCallback, header, children, modifiers }) => {
  useEffect(() => {
    const handleEscape = e => {
      if (visible && e.keyCode === 27) {
        closeCallback(e);
      }
    };

    if (visible) {
      window.addEventListener('keyup', handleEscape);
    }

    if (!visible) {
      window.removeEventListener('keyup', handleEscape);
    }

    return () => {
      if (visible) window.removeEventListener('keyup', handleEscape);
    };
  }, [visible, closeCallback]);

  const clickOffBackdrop = visible ? (
    <button
      className={classNames(style.backdrop)}
      onClick={() => closeCallback('backdrop')}
    />
  ) : null;

  const mainClass = classNames(style.main);

  const className = classNames(style.SideTray, {
    [style.flex]: modifiers.indexOf('flex') >= 0,
    [style.show]: visible,
    [style.hide]: !visible,
  });

  return (
    <div>
      <div className={className}>
        <div className={mainClass}>
          {header}
          <div className={classNames(style.content)}>{children}</div>
        </div>
      </div>
      {clickOffBackdrop}
    </div>
  );
};

SideTray.defaultProps = {
  visible: false,
  modifiers: [],
  header: null,
};

SideTray.propTypes = {
  visible: PropTypes.bool,
  closeCallback: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(['flex'])),
  header: PropTypes.node,
};

export default SideTray;
