import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.css';

const Item = ({ className, ...passedProps }) => {
  if (passedProps.href) {
    // The anchor's content is provided by passedProps
    /* eslint-disable jsx-a11y/anchor-has-content */
    return (
      <a
        className={classNames(style.Item, style.link, className)}
        {...passedProps}
      />
    );
    /* eslint-enable jsx-a11y/anchor-has-content */
  }

  if (passedProps.onClick) {
    return (
      <button
        className={classNames(style.Item, style.button, className)}
        type="button"
        {...passedProps}
      />
    );
  }

  return (
    <div
      className={classNames(style.Item, style.content, className)}
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
