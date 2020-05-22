import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Tooltip.module.css';

import Icon from '../Icon';

export const directions = ['top', 'left', 'right', 'bottom'];

const Tooltip = ({
  children,
  closeOnEscape,
  content: tooltipContent,
  direction,
  isOpen,
  onClose,
  showOnHover,
  tooltipProps: tooltipOptsProp,
  tooltipWidth,
  ...rest
}) => {
  const [tooltipId] = useState(
    `tooltip-${Date.now() * Math.floor(100 * Math.random())}`
  );
  const tooltipRef = useRef(null);

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
    },
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
        className={styles.original}
      >
        {children}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  closeOnEscape: PropTypes.bool,
  content: PropTypes.node,
  direction: PropTypes.oneOf(directions),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  showOnHover: PropTypes.bool,
  tooltipProps: PropTypes.shape({
    className: PropTypes.string,
    style: PropTypes.object,
  }),
  tooltipWidth: PropTypes.string,
};

Tooltip.defaultProps = {
  closeOnEscape: true,
  content: null,
  direction: 'top',
  isOpen: false,
  onClose: null,
  showOnHover: false,
  tooltipProps: {},
  tooltipWidth: null,
};

export default Tooltip;

export const EasyRichTooltip = ({ onClose, children, ...props }) => {
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

EasyRichTooltip.propTypes = {
  ...Tooltip.propTypes,
  children: PropTypes.func.isRequired,
};
