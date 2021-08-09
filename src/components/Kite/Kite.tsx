import React, { useEffect, CSSProperties } from 'react';
import classNames from 'classnames';

import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Kite.module.css';
import Button from '../Button';
import Icon from '../Icon';

interface KiteProps {
  children?: React.ReactNode;
  canBeDismissed?: boolean;
  className?: string;
  visible?: boolean;
  icon?: React.ReactNode;
  onClose?: () => void;
  style?: CSSProperties;
  ttl?: number;
}

type KiteIconProps = Parameters<typeof Icon>[0];
type KiteChildProps = React.HTMLAttributes<HTMLDivElement>;

type KiteType = React.FC<KiteProps> & {
  Body: React.FC<KiteChildProps>;
  Header: React.FC<KiteChildProps>;
  Icon: React.FC<KiteIconProps>;
};

const Kite: KiteType = ({
  canBeDismissed = true,
  children = undefined,
  className: passedClassName = '',
  visible = false,
  icon = undefined,
  onClose = () => {},
  ttl = undefined,
  ...passedProps
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (onClose && ttl) {
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
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.content}>{children}</div>
        {canBeDismissed && (
          <div className={styles.dismissButton}>
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
          </div>
        )}
      </div>
    </CSSTransition>,
    document.body
  );
};

const KiteIcon: React.FC<KiteIconProps> = ({ className, ...props }) => {
  return <Icon {...props} className={classNames(styles.icon, className)} />;
};

const KiteHeader: React.FC<KiteChildProps> = ({ className, ...props }) => (
  <div {...props} className={classNames(styles.header, className)} />
);
const KiteBody: React.FC<KiteChildProps> = ({ className, ...props }) => {
  return <div {...props} className={classNames(styles.body, className)} />;
};

Kite.Icon = KiteIcon;
Kite.Header = KiteHeader;
Kite.Body = KiteBody;

export default Kite;
