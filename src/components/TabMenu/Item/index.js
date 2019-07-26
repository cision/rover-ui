import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import style from './style.css';

const Item = ({
  size,
  className: customClassName,
  active,
  onClick,
  children,
  ...props
}) => {
  const isChildActive = child => {
    if (typeof child !== 'object') return false;
    if ((child.props || {}).className) {
      return child.props.className.indexOf('active') >= 0;
    }
    return false;
  };

  const className = classNames(style.TabItem, customClassName, {
    [style.active]: active || isChildActive(children),
  });
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
};

Item.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Item.defaultProps = {
  size: 16,
  className: '',
  active: false,
  onClick: () => {},
};

export default Item;
