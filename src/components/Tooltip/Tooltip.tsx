import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';

import classNames from 'classnames';

import Icon from '../Icon';

import styles from './Tooltip.module.css';

export type TooltipDirection =
  // | 'bottom-left'
  // | 'bottom-right'
  | 'bottom'
  // | 'left-bottom'
  // | 'left-top'
  | 'left'
  // | 'right-bottom'
  // | 'right-top'
  | 'right'
  // | 'top-left'
  // | 'top-right'
  | 'top';

export const directions: TooltipDirection[] = [
  // 'bottom-left',
  // 'bottom-right',
  'bottom',
  // 'left-bottom',
  // 'left-top',
  'left',
  // 'right-bottom',
  // 'right-top',
  'right',
  // 'top-left',
  // 'top-right',
  'top',
];

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
  const [tooltipHeight, setTooltipHeight] = useState(0);

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

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.offsetHeight);
    }
  }, []); // empty deps ensure this only gets called once

  const {
    style: tooltipStyle,
    className: tooltipClassName,
    ...tooltipOpts
  } = tooltipOptsProp;

  const tooltipClassNames = classNames(
    styles.Tooltip,
    styles[direction],
    tooltipClassName,
    {
      [styles.open]: isOpen,
    }
  );

  const offsets = useMemo(() => {
    // Properly center tooltips on the left and right to the center
    // of the actual element we are attaching the tooltip.
    if (direction === 'left' || direction === 'right') {
      return {
        marginTop: -(tooltipHeight / 2),
      };
    }

    return {};
  }, [direction, tooltipHeight]);

  const isText = typeof tooltipContent === 'string';

  const tooltipWrapperProps = {
    style: {
      width: (tooltipStyle && tooltipStyle.width) || tooltipWidth,
      ...offsets,
    } as React.CSSProperties,
    className: tooltipClassNames,
  };

  const TooltipContent = tooltipContent && (
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
          <div className={styles.textContent}>{tooltipContent}</div>
        ) : (
          tooltipContent
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper} {...rest}>
      <div
        aria-describedby={tooltipId}
        className={classNames(className, styles.original)}
        onBlur={() => handleSetHover(false)}
        onFocus={() => handleSetHover(true)}
        onMouseLeave={() => handleSetHover(false)}
        onMouseEnter={() => handleSetHover(true)}
      >
        {children}
      </div>
      {TooltipContent}
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
