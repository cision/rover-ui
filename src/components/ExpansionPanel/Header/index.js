import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

import style from './style.css';

const Header = ({
  className,
  children,
  expanded,
  expandIcon: expandIconProp,
  ...passedProps
}) => {
  const expandIcon =
    expandIconProp &&
    React.cloneElement(expandIconProp, {
      ...expandIconProp.props,
      className: classNames(style.expandIcon, { [style.expanded]: expanded }),
    });

  return (
    <div {...passedProps} className={classNames(className, style.Header)}>
      {isFunction(children) ? (
        children(expandIcon)
      ) : (
        <Fragment>
          {children}
          {expandIcon}
        </Fragment>
      )}
    </div>
  );
};

Header.propTypes = {
  /**
   * The header content to render.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * Whether it is expanded or not.
   */
  expanded: PropTypes.bool,
  /**
   * Optional icon. If will be rotated by 180 degrees if it is expanded.
   */
  expandIcon: PropTypes.node,
};

Header.defaultProps = {
  expanded: false,
};

Header.displayName = 'ExpansionPanel.Header';

export default Header;
