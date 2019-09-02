import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import isNull from 'lodash/isNull';

import style from './style.css';

const Collapse = ({
  children,
  isOpen,
  onEntered,
  onEntering,
  onExit,
  onExited,
  onExiting,
  timeout,
  ...passedProps
}) => {
  const [height, setHeight] = useState(null);

  const handleEntering = useCallback(
    (node, isAppearing) => {
      setHeight(node.scrollHeight);
      node.style.transitionDuration = `${timeout}ms`;
      onEntering(node, isAppearing);
    },
    [onEntering, setHeight, timeout]
  );

  const handleEntered = useCallback(
    (node, isAppearing) => {
      setHeight(null);
      onEntered(node, isAppearing);
    },
    [onEntered, setHeight]
  );

  const handleExit = useCallback(
    node => {
      setHeight(node.scrollHeight);
      onExit(node);
    },
    [onExit, setHeight]
  );

  const handleExiting = useCallback(
    node => {
      node.offsetHeight; // getting this variable triggers a reflow
      setHeight(0);
      node.style.transitionDuration = `${timeout}ms`;
      onExiting(node);
    },
    [onExiting, setHeight, timeout]
  );

  const handleExited = useCallback(
    node => {
      setHeight(null);
      onExited(node);
    },
    [onExited, setHeight]
  );

  return (
    <Transition
      {...passedProps}
      in={isOpen}
      timeout={timeout}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      {transitionState => {
        const styleHeight = isNull(height) ? null : { height };
        return (
          <div style={styleHeight} className={style[transitionState]}>
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

Collapse.propTypes = {
  ...Transition.propTypes,
  /**
   * The content of the expansion panel.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /**
   * Whether the children is collapsed or not.
   */
  isOpen: PropTypes.bool,
  /**
   * The duration for the transition, in milliseconds.
   */
  timeout: PropTypes.number,
};

Collapse.defaultProps = {
  ...Transition.defaultProps,
  isOpen: false,
  timeout: 200,
};

export default Collapse;
