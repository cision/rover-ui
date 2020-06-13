import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import classNames from 'classnames';

import styles from './Tooltip.module.css';

import Icon from '../Icon';

export type TooltipDirection = 'top' | 'left' | 'right' | 'bottom';
export const directions: TooltipDirection[] = [
  'top',
  'left',
  'right',
  'bottom',
];

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  closeOnEscape?: boolean;
  content?: React.ReactNode;
  direction?: TooltipDirection;
  isOpen?: boolean;
  tooltipProps?: React.HTMLAttributes<HTMLDivElement>;
  tooltipWidth?: string;
  onClose?: () => void;
  showOnHover?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  className = '',
  closeOnEscape = true,
  content: tooltipContent = null,
  direction = 'top',
  isOpen = false,
  onClose = null,
  showOnHover = false,
  tooltipProps: tooltipOptsProp = {},
  tooltipWidth = null,
  ...rest
}) => {
  const [tooltipId] = useState(
    `tooltip-${Date.now() * Math.floor(100 * Math.random())}`
  );
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  const handleSetHover = (value) => () => {
    if (showOnHover) {
      setHovered(value);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (onClose && e.key === 'Escape') {
        onClose();
      }
    };

    if (closeOnEscape) {
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }

    return () => {};
  }, [closeOnEscape, onClose]);

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
      [styles.open]: isOpen || hovered,
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
      aria-hidden={isOpen}
      ref={tooltipRef}
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
      {TooltipContent}
      <div
        aria-describedby={tooltipId}
        onMouseEnter={handleSetHover(true)}
        onMouseLeave={handleSetHover(false)}
        className={classNames(className, styles.original)}
      >
        {children}
      </div>
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
