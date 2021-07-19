import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Icon from '../Icon';

import styles from './Tooltip.module.css';

export const directions = [
  'bottom-left',
  'bottom-right',
  'bottom',
  'left-bottom',
  'left-top',
  'left',
  'right-bottom',
  'right-top',
  'right',
  'top-left',
  'top-right',
  'top',
] as const;

// Turn array of strings into a union type
export type TooltipDirection = typeof directions[number];

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  closeButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
  closeOnEscape?: boolean;
  content?: React.ReactNode;
  direction?: TooltipDirection;
  isOpen?: boolean;
  onClose?: () => void;
  showOnHover?: boolean;
  tooltipProps?: React.HTMLAttributes<HTMLDivElement>;
  tooltipWidth?: string;
}

const transitionDuration = 300;

const Tooltip: React.FC<TooltipProps> = ({
  children,
  className = '',
  closeButtonProps = {},
  closeOnEscape = true,
  content: tooltipContent = null,
  direction = 'top',
  isOpen: controlledIsOpen = false,
  onClose = null,
  showOnHover = false,
  tooltipProps: tooltipOptsProp = {},
  tooltipWidth = null,
  ...rest
}) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isControlled = !showOnHover;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const [tooltipId] = useState(
    `tooltip-${Date.now() * Math.floor(100 * Math.random())}`
  );

  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipWrapperRef = useRef<HTMLDivElement>(null);

  const [isTooltipWiderThanParent, setIsTooltipWiderThanParent] = useState(
    true
  );

  const handleSetHover = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledIsOpen(value);
      }
    },
    [isControlled, setUncontrolledIsOpen]
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!isControlled) {
          setUncontrolledIsOpen(false);
        }

        if (onClose) onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isControlled, onClose]);

  const {
    style: tooltipStyle,
    className: tooltipClassName,
    ...tooltipOpts
  } = tooltipOptsProp;

  const [mainDirection, secondaryDirection] = useMemo(() => {
    const parsedDirection = direction.split('-');
    let [, secondary] = parsedDirection;

    if (
      ['left', 'right'].indexOf(secondary) >= 0 &&
      !isTooltipWiderThanParent
    ) {
      secondary = '';
    }

    return [parsedDirection[0], secondary];
  }, [direction, isTooltipWiderThanParent]);

  const directionClassNames = classNames(styles[`main-${mainDirection}`], {
    [styles[`secondary-${secondaryDirection}`]]: secondaryDirection,
  });

  const tooltipClassNames = classNames(styles.Tooltip, tooltipClassName);

  const isText = typeof tooltipContent === 'string';

  const tooltipHasWidth = (tooltipStyle && tooltipStyle.width) || tooltipWidth;

  const tooltipWrapperProps = {
    style: {
      width: tooltipHasWidth,
    } as React.CSSProperties,
    className: tooltipClassNames,
  };

  useLayoutEffect(() => {
    if (isOpen && tooltipRef.current && tooltipWrapperRef.current) {
      setIsTooltipWiderThanParent(
        tooltipRef.current.offsetWidth > tooltipWrapperRef.current.offsetWidth
      );
    }
  }, [isOpen]);

  const TooltipContent = tooltipContent && (
    <div style={{ transitionDuration: `${transitionDuration / 1000}s` }}>
      <div className={styles.arrow} />
      <div
        id={tooltipId}
        aria-hidden={!isOpen}
        ref={tooltipRef}
        role="tooltip"
        {...tooltipWrapperProps}
      >
        <div
          style={tooltipStyle}
          className={styles.tooltipInnerWrapper}
          {...tooltipOpts}
        >
          {!!onClose && (
            <button
              type="button"
              className={styles.tooltipClose}
              onClick={onClose}
              aria-label="Close"
              {...closeButtonProps}
            >
              <Icon name="close" />
            </button>
          )}

          {isText ? (
            <div
              className={classNames({
                [styles.textContentHasWidth]: tooltipHasWidth,
                [styles.textContent]: !tooltipHasWidth,
              })}
            >
              {tooltipContent}
            </div>
          ) : (
            tooltipContent
          )}
        </div>
      </div>
    </div>
  );

  const noop = () => {};

  const tooltipTriggerProps = {
    onClick: noop,
    onKeyPress: noop,
    role: 'button',
    tabIndex: 0,
  };

  const tooltipTriggers = React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return <span {...tooltipTriggerProps}>{child}</span>;
    }

    const childEl = React.isValidElement(child)
      ? (child as React.ReactElement)
      : null;

    if (childEl) {
      return React.cloneElement(childEl, {
        ...tooltipTriggerProps,
        ...childEl?.props,
      });
    }

    return null;
  });

  return (
    <div
      className={styles.wrapper}
      onBlur={() => handleSetHover(false)}
      onFocus={() => handleSetHover(true)}
      onMouseLeave={() => handleSetHover(false)}
      onMouseEnter={() => handleSetHover(true)}
      ref={tooltipWrapperRef}
      {...rest}
    >
      <div
        aria-describedby={tooltipId}
        className={classNames(className, styles.original)}
      >
        {tooltipTriggers}
      </div>
      <CSSTransition
        className={classNames(styles.fade, directionClassNames)}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
        in={isOpen}
        timeout={transitionDuration}
        unmountOnExit
      >
        {TooltipContent}
      </CSSTransition>
    </div>
  );
};

export default Tooltip;

interface EasyTooltipChildren {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface EasyRichTooltipProps extends Omit<TooltipProps, 'children'> {
  children: (opts: EasyTooltipChildren) => React.ReactNode;
}

export const EasyRichTooltip: React.FC<EasyRichTooltipProps> = ({
  onClose,
  children,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <Tooltip
      isOpen={isOpen}
      onClose={() => {
        if (onClose) {
          onClose();
        }
        setOpen(false);
      }}
      {...props}
    >
      {children({ open, close, toggle })}
    </Tooltip>
  );
};
