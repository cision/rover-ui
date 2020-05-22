import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Item.module.css';

export interface ItemProps {
  className?: string;
  href?: string;
  onClick?: () => void;
}

const Item: React.FC<ItemProps> = ({
  className = '',
  href = null,
  onClick = null,
  ...passedProps
}) => {
  if (href) {
    // The anchor's content is provided by passedProps
    /* eslint-disable jsx-a11y/anchor-has-content */
    return (
      <a
        className={classNames(styles.Item, styles.link, className)}
        href={href}
        {...passedProps}
      />
    );
    /* eslint-enable jsx-a11y/anchor-has-content */
  }

  if (onClick) {
    return (
      <button
        className={classNames(styles.Item, styles.button, className)}
        type="button"
        onClick={onClick}
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
