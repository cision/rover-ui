import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

import styles from './Header.module.css';

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
      className: classNames(styles.expandIcon, { [styles.expanded]: expanded }),
    });

  return (
    <div {...passedProps} className={classNames(className, styles.Header)}>
      {isFunction(children) ? (
        children(expandIcon)
      ) : (
        <>
          {children}
          {expandIcon}
        </>
      )}
    </div>
  );
};

Header.propTypes = {
  /**
   * Optional classes.
   */
  className: PropTypes.string,
  /**
   * The header content to render.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
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
  children: null,
  className: '',
  expanded: false,
  expandIcon: null,
};

Header.displayName = 'ExpansionPanel.Header';

export default Header;
