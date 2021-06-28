import React, { useEffect, CSSProperties } from 'react';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Kite.module.css';
import Button from '../Button';
import Icon from '../Icon';

interface KiteProps {
  canBeDismissed?: boolean;
  children?: React.ReactNode;
  className?: ClassValue;
  visible?: boolean;
  onClose?: () => void;
  style?: CSSProperties;
  title: React.ReactNode;
  ttl?: number;
}

type KiteChildProps = Pick<KiteProps, 'children' | 'className'>;

type KiteType = React.FC<KiteProps> & {
  KiteIcon: React.FC<KiteChildProps>;
};

const Kite: KiteType = ({
  canBeDismissed = true,
  children = undefined,
  className: passedClassName = '',
  visible = false,
  onClose = () => {},
  title,
  ttl = undefined,
  ...passedProps
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (onClose) {
        onClose();
      }
    }, ttl);
    return () => {
      clearInterval(interval);
    };
  }, [onClose, ttl]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={visible}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      classNames={{
        enterDone: styles.enterDone,
        exit: styles.exit,
      }}
    >
      <div
        className={classNames(
          styles.Kite,
          { [styles.visible]: visible },
          passedClassName
        )}
        {...passedProps}
      >
        <div className={styles.content}>
          {children}
          <div className={styles.title}>{title}</div>
          {canBeDismissed && (
            <Button
              level="text"
              onClick={onClose}
              data-testid="kite-dismiss-button"
            >
              <Button.Addon>
                <Icon
                  height="20"
                  name="close"
                  style={{ display: 'block' }}
                  width="20"
                />
              </Button.Addon>
            </Button>
          )}
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

const KiteIcon: React.FC<KiteChildProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={classNames(styles.icon, className)}>
      {children}
    </div>
  );
};

Kite.KiteIcon = KiteIcon;
export default Kite;
