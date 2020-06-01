import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './style.css';

const Input = ({ className, fauxDisabled, ...passedProps }) => (
  <input
    className={classNames(styles.Input, className, {
      [styles.disabled]: fauxDisabled,
    })}
    {...passedProps}
  />
);

Input.propTypes = {
  className: PropTypes.string,
  /** Applies disabled appearance without disabling. Helpful for adding tooltips on disabled field clicks. */
  fauxDisabled: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  fauxDisabled: false,
};

export default Input;
