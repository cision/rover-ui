import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Item.module.css';

const Item = ({ className, ...passedProps }) => {
  if (passedProps.href) {
    // The anchor's content is provided by passedProps
    /* eslint-disable jsx-a11y/anchor-has-content */
    return (
      <a
        className={classNames(styles.Item, styles.link, className)}
        {...passedProps}
      />
    );
    /* eslint-enable jsx-a11y/anchor-has-content */
  }

  if (passedProps.onClick) {
    return (
      <button
        className={classNames(styles.Item, styles.button, className)}
        type="button"
        {...passedProps}
      />
    );
  }

  return (
    <div
      className={classNames(styles.Item, styles.content, className)}
      {...passedProps}
    />
  );
};

Item.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  className: '',
  href: undefined,
  onClick: undefined,
};

export default Item;
