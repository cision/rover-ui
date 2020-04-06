import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

import Icon from '../Icon';

export const directions = ['top', 'left', 'right', 'bottom'];

const Tooltip = ({
  children,
  closeable,
  closeOnEscape,
  content: tooltipContent,
  direction,
  isOpen,
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

  const closeFunc = useCallback(closeable || function() {}, []);

  const handleSetHover = value => () => {
    if (showOnHover) {
      setHovered(value);
    }
  };

  const handleEscape = e => {
    if (closeable && e.key === 'Escape') {
      closeable();
    }
  };

  useEffect(() => {
    if (closeOnEscape) {
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }

    return () => {};
  }, []);

  useEffect(() => {
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
  });

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
        {!!closeable && (
          <button className={styles.tooltipClose} onClick={closeFunc}>
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
  closeable: PropTypes.func,
  closeOnEscape: PropTypes.bool,
  content: PropTypes.node,
  direction: PropTypes.oneOf(directions),
  showOnHover: PropTypes.bool,
  isOpen: PropTypes.bool,
  tooltipProps: PropTypes.shape({
    className: PropTypes.string,
    style: PropTypes.object,
  }),
  tooltipWidth: PropTypes.string,
};

Tooltip.defaultProps = {
  content: null,
  closeable: null,
  closeOnEscape: true,
  direction: 'top',
  showOnHover: false,
  isOpen: false,
  tooltipProps: {},
  tooltipWidth: null,
};

export default Tooltip;

export const EasyRichTooltip = ({ closeable, children, ...props }) => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen(prev => !prev);

  return (
    <Tooltip
      isOpen={isOpen}
      closeable={() => {
        if (closeable) {
          closeable();
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
