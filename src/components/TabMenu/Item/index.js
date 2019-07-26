import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import style from './style.css';

const Item = ({ className: customClassName, active, children, ...props }) => {
  const isChildActive = child => {
    if (React.isValidElement(child)) {
      return child.props.className.indexOf('active') >= 0;
    }
    return false;
  };

  const className = classNames(style.Item, customClassName, {
    [style.active]: active || isChildActive(children),
  });
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
};

Item.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Item.defaultProps = {
  className: '',
  active: false,
  onClick: () => {},
};

export default Item;
