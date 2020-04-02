import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

import Icon from '../Icon';

export const directions = ['top', 'left', 'right', 'bottom'];

const Tooltip = ({
  children,
  closeable,
  closeIcon,
  content: tooltipContent,
  direction,
  hover,
  tooltipOpts: tooltipOptsProp,
  open,
  onClose,
  text,
  width,
  ...rest
}) => {
  const childrenRef = useRef(null);
  const tooltipRef = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [childrenHeight, setChildrenHeight] = useState(0);

  const handleSetHover = value => () => {
    if (hover) {
      setHovered(value);
    }
  };

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.offsetHeight);
      setChildrenHeight(childrenRef.current.offsetHeight);
    }
  });

  const {
    style,
    className: tooltipClassName,
    ...tooltipOpts
  } = tooltipOptsProp;

  const tooltipClassNames = classNames(
    styles.Tooltip,
    styles[direction],
    tooltipClassName,
    {
      [styles.open]: open || hovered,
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

  const tooltipProps = {
    ...tooltipOpts,
    style: {
      width: (style && style.width) || width,
      ...offsets,
      ...(tooltipOpts.style || {}),
    },
    className: tooltipClassNames,
  };

  const TooltipContent = (text || tooltipContent) && (
    <div ref={tooltipRef} {...tooltipProps}>
      <div style={style} className={styles.tooltipInnerWrapper}>
        {closeable && (
          <button className={styles.tooltipClose} onClick={onClose}>
            <Icon name={closeIcon} />
          </button>
        )}
        <div
          className={classNames({
            [styles.textContent]: text,
          })}
        >
          {text || tooltipContent}
        </div>
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
  closeable: PropTypes.bool,
  closeIcon: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.element,
  ]),
  direction: PropTypes.oneOf(directions),
  hover: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  text: PropTypes.string,
  tooltipOpts: PropTypes.shape({
    className: PropTypes.string,
    style: PropTypes.object,
  }),
  width: PropTypes.string,
};

Tooltip.defaultProps = {
  content: null,
  closeable: false,
  closeIcon: 'close',
  direction: 'top',
  hover: false,
  onClose: () => {},
  open: false,
  text: null,
  tooltipOpts: {},
  width: null,
};

export default Tooltip;
