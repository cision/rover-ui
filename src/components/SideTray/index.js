import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Rover UI dependencies
import { parseCssSize } from '../../shared/css-utils';

// This component's dependencies
import styles from './SideTray.module.css';

const SideTray = ({
  children,
  className,
  direction,
  height,
  onClose,
  visible,
  width,
  ...passedProps
}) => {
  // Close tray when the user hits "Escape"
  useEffect(() => {
    // TODO: Hitting "Escape" should only close the active tray
    // TODO: Hitting "Escape" in a text field shouldn't close the tray
    const handleEscape = (e) => {
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

  // Handle clicking backdrop to close tray
  // TODO: Click and drag from inside to outside the tray shouldn't close it
  const clickOffBackdrop = visible ? (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button type="button" className={styles.backdrop} onClick={onClose} />
  ) : null;

  // Handle custom widths / heights / directions
  const parsedHeight = parseCssSize({ size: height });
  const parsedWidth = parseCssSize({ size: width });
  let hideTransformStyle;

  const sideTrayStyles = {
    bottom: 0,
    height: `${parsedHeight.size}${parsedHeight.unit}`,
    left: 0,
    right: 0,
    top: 0,
    width: `${parsedWidth.size}${parsedWidth.unit}`,
  };

  switch (direction) {
    case 't':
      hideTransformStyle = `translate3d(0, ${-parsedHeight.size}${parsedHeight.unit}, 0)`; // prettier-ignore
      sideTrayStyles.bottom = 'auto';
      break;
    case 'b':
      hideTransformStyle = `translate3d(0, ${parsedHeight.size}${parsedHeight.unit}, 0)`;
      sideTrayStyles.top = 'auto';
      break;
    case 'l':
      hideTransformStyle = `translate3d(${-parsedWidth.size}${parsedWidth.unit}, 0, 0)`; // prettier-ignore
      sideTrayStyles.right = 'auto';
      break;
    default:
    case 'r':
      hideTransformStyle = `translate3d(${parsedWidth.size}${parsedWidth.unit}, 0, 0)`;
      sideTrayStyles.left = 'auto';
      break;
  }

  return (
    <>
      <div
        {...passedProps}
        style={{
          ...sideTrayStyles,
          ...(!visible ? { transform: hideTransformStyle } : {}),
          ...passedProps.style,
        }}
        className={`${styles.SideTray} ${className}`}
      >
        <div className={styles.container}>{children}</div>
      </div>
      {clickOffBackdrop}
    </>
  );
};

SideTray.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['t', 'r', 'b', 'l']),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func.isRequired,
  style: PropTypes.object,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SideTray.defaultProps = {
  className: '',
  direction: 'r',
  height: '100vh',
  style: {},
  visible: false,
  width: '400px',
};

const Header = ({ className, ...props }) => (
  <div {...props} className={`${styles.header} ${className}`} />
);
Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Header.defaultProps = { className: '' };

const Footer = ({ className, ...props }) => (
  <div {...props} className={`${styles.footer} ${className}`} />
);
Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Footer.defaultProps = { className: '' };

const Body = ({ className, ...props }) => (
  <div {...props} className={`${styles.body} ${className}`} />
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
