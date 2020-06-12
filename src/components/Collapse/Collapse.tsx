import React, { useState, useCallback } from 'react';
import { Transition } from 'react-transition-group';
import isNull from 'lodash/isNull';

import styles from './Collapse.module.css';

interface CollapseProps {
  isOpen?: boolean;
  onEntered?: (node: React.ReactNode, isAppearing: boolean) => void;
  onEntering?: (node: React.ReactNode, isAppearing: boolean) => void;
  onExit?: (node: React.ReactNode) => void;
  onExited?: (node: React.ReactNode) => void;
  onExiting?: (node: React.ReactNode) => void;
  timeout?: number;
}

const Collapse: React.FC<CollapseProps> = ({
  children,
  isOpen = false,
  onEntered = () => {},
  onEntering = () => {},
  onExit = () => {},
  onExited = () => {},
  onExiting = () => {},
  timeout = 200,
  ...passedProps
}) => {
  const [height, setHeight] = useState<number | null>(null);

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
    (node) => {
      setHeight(node.scrollHeight);
      onExit(node);
    },
    [onExit, setHeight]
  );

  const handleExiting = useCallback(
    (node) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      // node.offsetHeight; // getting this variable triggers a reflow
      setHeight(0);
      node.style.transitionDuration = `${timeout}ms`;
      onExiting(node);
    },
    [onExiting, setHeight, timeout]
  );

  const handleExited = useCallback(
    (node) => {
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
      {(transitionState) => {
        const styleHeight = isNull(height) ? {} : { height };
        return (
          <div style={styleHeight} className={styles[transitionState]}>
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

export default Collapse;
