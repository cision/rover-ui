import React, { useEffect, CSSProperties } from 'react';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Kite.module.css';
import Button from '../Button';
import Icon from '../Icon';

interface KiteProps {
  children?: React.ReactNode;
  className?: ClassValue;
  visible?: boolean;
  onClose?: () => void;
  style?: CSSProperties;
  ttl?: number;
}

type KiteIconProps = Parameters<typeof Icon>[0];
type KiteContentProps = Pick<KiteProps, 'children' | 'className'>;

type KiteHeaderProps = Pick<KiteProps, 'children' | 'className' | 'onClose'> & {
  canBeDismissed?: boolean;
  title: React.ReactNode;
};

type KiteType = React.FC<KiteProps> & {
  Header: React.FC<KiteHeaderProps>;
  Icon: React.FC<KiteIconProps>;
  Content: React.FC<KiteContentProps>;
};

const Kite: KiteType = ({
  children = undefined,
  className: passedClassName = '',
  visible = false,
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
        {children}
      </div>
    </CSSTransition>,
    document.body
  );
};

const KiteIcon: React.FC<KiteIconProps> = ({ className, ...props }) => {
  return <Icon {...props} className={classNames(styles.icon, className)} />;
};

const KiteContent: React.FC<KiteContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={classNames(styles.content, className)}>
      {children}
    </div>
  );
};

const KiteHeader: React.FC<KiteHeaderProps> = ({
  className,
  canBeDismissed = true,
  children,
  onClose = () => {},
  title,
  ...props
}) => {
  return (
    <div {...props} className={classNames(styles.header, className)}>
      {children}
      {title}
      <div className={styles.dismissButton}>
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
  );
};

Kite.Header = KiteHeader;
Kite.Icon = KiteIcon;
Kite.Content = KiteContent;
export default Kite;
