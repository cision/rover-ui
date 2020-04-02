import React, { useRef, useEffect, useState, useMemo } from 'react';
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
  hover,
  tooltipOpts: tooltipOptsProp,
  open,
  onClose,
  width,
  ...rest
}) => {
  const childrenRef = useRef(null);
  const tooltipRef = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [childrenWidth, setWidth] = useState({});
  const [childrenHeight, setHeight] = useState(0);

  useEffect(() => {
    if (childrenRef.current) {
      setHeight(childrenRef.current.offsetHeight);
      setWidth(childrenRef.current.offsetWidth);
    }
  });

  const handleSetHover = value => () => {
    if (hover) {
      setHovered(value);
    }
  };

  const offsets = useMemo(() => {
    if (direction === 'top') {
      return {
        bottom: childrenHeight + 20,
      };
    } else if (direction === 'bottom') {
      return {
        top: childrenHeight + 20,
      };
    } else if (direction === 'right') {
      return {
        left: childrenWidth + 20,
      };
    }
    return {
      right: childrenWidth + 20,
    };
  });

  const {
    style,
    className: tooltipClassName,
    ...tooltipOpts
  } = tooltipOptsProp;

  const tooltipProps = {
    ...tooltipOpts,
    style: {
      ...offsets,
      width: (style && style.width) || width,
    },
    className: classNames(styles.Tooltip, styles[direction], tooltipClassName, {
      [styles.open]: open || hovered,
    }),
  };

  const TooltipContent = tooltipContent && (
    <div {...tooltipProps}>
      <div style={style} className={styles.tooltipInnerWrapper}>
        {closeable && (
          <button className={styles.tooltipClose} onClick={onClose}>
            <Icon name="close" />
          </button>
        )}
        <div ref={tooltipRef}>{tooltipContent}</div>
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
  direction: 'top',
  hover: false,
  onClose: () => {},
  open: false,
  text: '',
  tooltipOpts: {},
  width: '150px',
};

export default Tooltip;
