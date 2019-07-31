import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Addon from './Addon';
import style from './style.css';

const Pill = ({
  checked,
  children: initChildren,
  className,
  onClick,
  ...passedProps
}) => {
  let children = initChildren;

  children = React.Children.map(initChildren, child =>
    (child && child.type && child.type.displayName) === Addon.displayName ? (
      <div className={style.actionInline}>
        {React.cloneElement(child, { checked })}
      </div>
    ) : (
      child && <span className={style.content}>{child}</span>
    )
  );

  const clickableProps = onClick
    ? {
        role: 'button',
        tabIndex: 0,
        onClick,
      }
    : {};

  return (
    <div
      {...passedProps}
      {...clickableProps}
      className={classNames(style.Pill, className, {
        [style.checked]: checked,
      })}
    >
      {children}
    </div>
  );
};

Pill.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Pill.defaultProps = {
  checked: false,
  className: '',
  onClick: null,
};

Pill.Addon = Addon;

export default Pill;
