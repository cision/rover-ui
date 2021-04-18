import React, { CSSProperties, useCallback, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type Size = 'sm' | 'md' | 'lg';
type Level = 'primary' | 'warning' | 'info' | 'danger';

interface ModalProps {
  children?: React.ReactNode;
  className?: ClassValue;
  isOpen?: boolean;
  onClose?: () => void;
  size?: Size;
  style?: CSSProperties;
}

type ModalChildProps = Pick<ModalProps, 'children' | 'className'>;
type ModalHeaderProps = Pick<ModalProps, 'children' | 'className'> & {
  level?: Level;
};

type ModalType = React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>;
  Footer: React.FC<ModalChildProps>;
  Body: React.FC<ModalChildProps>;
};

const Modal: ModalType = ({
  children,
  className: passedClassName = '',
  isOpen = false,
  onClose = () => {},
  size = 'md',
  style: passedStyle = {},
  ...passedProps
}) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (isOpen && e.code === 'Escape' && onClose) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keyup', handleEscape);
    }

    if (!isOpen) {
      window.removeEventListener('keyup', handleEscape);
    }

    return () => {
      if (isOpen) window.removeEventListener('keyup', handleEscape);
    };
  }, [handleEscape, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.className = classNames(
        document.body.className,
        styles.bodyHasOpenModal
      );
    } else {
      document.body.className = document.body.className
        .replace(styles.bodyHasOpenModal, '')
        .trim();
    }
  }, [isOpen]);

  const modalContentStyle = classNames(
    styles.content,
    {
      [styles[size]]: size,
    },
    passedClassName
  );

  return ReactDOM.createPortal(
    <CSSTransition
      in={isOpen}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      classNames={{
        enterDone: styles.enterDone,
        exit: styles.exit,
      }}
    >
      <div
        role="presentation"
        {...passedProps}
        style={passedStyle}
        className={styles.Modal}
        onClick={onClose}
      >
        <div
          role="presentation"
          className={modalContentStyle}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

const Header: React.FC<ModalHeaderProps> = ({
  children,
  className = '',
  level = 'primary',
  ...props
}) => (
  <div
    {...props}
    className={classNames(
      styles.Header,
      { [styles[`level--${level}`]]: level },
      className
    )}
  >
    {children}
  </div>
);

const Body: React.FC<ModalChildProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div {...props} className={classNames(styles.Body, className)}>
    {children}
  </div>
);

const Footer: React.FC<ModalChildProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div {...props} className={classNames(styles.Footer, className)}>
    {children}
  </div>
);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
