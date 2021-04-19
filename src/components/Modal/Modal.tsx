import React, {
  createContext,
  createRef,
  CSSProperties,
  useCallback,
  //useContext,
  useEffect,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

import ReactDOM from 'react-dom';
import { TrapFocus } from './TrapFocus';

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

const modalRef = createRef<HTMLDivElement>();
const modalContext = createContext({ onClose: () => {} });

/*const getFocusableElements = (element: HTMLElement) => {
  return element?.querySelectorAll(
    'a, button, textarea, input, input[type="radio"], input[type="checkbox"], select'
  );
};

const getFirstFocusableElement = (element: HTMLElement) => {
  const focusableElements = getFocusableElements(element);
  return focusableElements && focusableElements[0];
};

const getLastFocusableElement = (element: HTMLElement) => {
  const focusableElements = getFocusableElements(element);
  return focusableElements && focusableElements[focusableElements.length - 1];
};*/

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
        if (!modalRef?.current?.contains(document.activeElement)) {
          onClose();
        }
        (document.activeElement as HTMLElement).blur();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    const keyListenerMap = new Map([['Escape', handleEscape]]);

    const keyListener = (e: KeyboardEvent) => {
      const listener = keyListenerMap.get(e.code);
      return listener && listener(e);
    };

    if (isOpen) {
      window.addEventListener('keydown', keyListener);
    }

    if (!isOpen) {
      window.removeEventListener('keydown', keyListener);
    }

    return () => {
      if (isOpen) window.removeEventListener('keydown', keyListener);
    };
  }, [handleEscape, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.className = classNames(
        document.body.className,
        styles.bodyHasOpenModal
      );
      //AutoFocus goes
      /*const firstElement = getFirstFocusableElement(
        modalRef?.current as HTMLElement
      );

      (firstElement as HTMLElement)?.focus();*/
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

  const handleClickBackdrop = (e: React.MouseEvent) => {
    if (e.target && modalRef?.current?.contains(e.target as HTMLElement)) {
      return;
    }
    onClose();
  };

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
        onClick={handleClickBackdrop}
      >
        <div role="dialog" className={modalContentStyle} ref={modalRef}>
          <TrapFocus elementRef={modalRef} isOpen={isOpen} />
          <modalContext.Provider value={{ onClose }}>
            {children}
          </modalContext.Provider>
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
}) => {
  return (
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
};

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
