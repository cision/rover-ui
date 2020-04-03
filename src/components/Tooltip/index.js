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
  content: tooltipContent,
  direction,
  isOpen,
  showOnHover,
  tooltipOpts: tooltipOptsProp,
  tooltipWidth,
  ...rest
}) => {
  const childrenRef = useRef(null);
  const tooltipRef = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [childrenHeight, setChildrenHeight] = useState(0);

  const closeFunc = useCallback(closeable || function() {}, []);

  const handleSetHover = value => () => {
    if (showOnHover) {
      setHovered(value);
    }
  };

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.offsetHeight);
      setChildrenHeight(childrenRef.current.offsetHeight);
    }
  }, []);

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
        top: (childrenHeight - tooltipHeight) / 2,
      };
    }

    return {};
  });

  const isText = typeof tooltipContent === 'string';

  const tooltipProps = {
    ...tooltipOpts,
    style: {
      width: (tooltipStyle && tooltipStyle.width) || tooltipWidth,
      ...offsets,
    },
    className: tooltipClassNames,
  };

  const TooltipContent = tooltipContent && (
    <div ref={tooltipRef} {...tooltipProps}>
      <div style={tooltipStyle} className={styles.tooltipInnerWrapper}>
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
        ref={childrenRef}
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
  content: PropTypes.node,
  direction: PropTypes.oneOf(directions),
  showOnHover: PropTypes.bool,
  isOpen: PropTypes.bool,
  tooltipOpts: PropTypes.shape({
    className: PropTypes.string,
    style: PropTypes.object,
  }),
  tooltipWidth: PropTypes.string,
};

Tooltip.defaultProps = {
  content: null,
  closeable: null,
  direction: 'top',
  showOnHover: false,
  isOpen: false,
  tooltipOpts: {},
  tooltipWidth: null,
};

export default Tooltip;
