import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.css';

const SideTray = ({ visible, onClose, children }) => {
  useEffect(() => {
    const handleEscape = e => {
      if (visible && e.keyCode === 27) {
        onClose(e);
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
  }, [visible, onClose]);

  const clickOffBackdrop = visible ? (
    <button className={style.backdrop} onClick={onClose} />
  ) : null;

  const sideTrayClassName = classNames(style.SideTray, {
    [style.show]: visible,
    [style.hide]: !visible,
  });

  return (
    <React.Fragment>
      <div className={sideTrayClassName}>
        <div className={style.container}>{children}</div>
      </div>
      {clickOffBackdrop}
    </React.Fragment>
  );
};

SideTray.defaultProps = {
  visible: false,
  header: null,
  footer: null,
};

SideTray.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const Header = props => (
  <div {...props} className={`${style.header} ${props.className}`} />
);
Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Header.defaultProps = { className: '' };

const Footer = props => (
  <div {...props} className={`${style.footer} ${props.className}`} />
);
Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Footer.defaultProps = { className: '' };

const Body = props => (
  <div {...props} className={`${style.body} ${props.className}`} />
);
Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Body.defaultProps = { className: '' };

SideTray.Header = Header;
SideTray.Footer = Footer;
SideTray.Body = Body;

export default SideTray;
