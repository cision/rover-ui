import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.css';

const SideTray = ({ visible, closeCallback, header, footer, children }) => {
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
    <button className={style.backdrop} onClick={closeCallback} />
  ) : null;

  const sideTrayClassName = classNames(style.sideTray, {
    [style.show]: visible,
    [style.hide]: !visible,
  });

  return (
    <div>
      <div className={sideTrayClassName}>
        <div className={style.main}>
          {header}
          <div className={style.content}>{children}</div>
          {footer}
        </div>
      </div>
      {clickOffBackdrop}
    </div>
  );
};

SideTray.defaultProps = {
  visible: false,
  header: null,
  footer: null,
};

SideTray.propTypes = {
  visible: PropTypes.bool,
  closeCallback: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default SideTray;
