import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';
import isFunction from 'lodash/isFunction';

import styles from './Callout.module.css';

import Icon from '../Icon';

export const variants = ['info', 'danger', 'warning', 'success'];

const Callout = ({
  borderless,
  className,
  children,
  onCancel,
  compact,
  variant,
  iconProps,
  ...props
}) => {
  const baseClass = styles.Callout;
  const isValidVariant = includes(variants, variant) && styles[variant];

  const mainClass = classNames(baseClass, className, {
    [styles[variant]]: isValidVariant,
    [styles.borderless]: borderless,
    [styles.compact]: compact,
    [styles.cancelable]: onCancel !== null,
  });

  return (
    <div className={mainClass} {...props}>
      {children}
      {onCancel && isFunction(onCancel) && (
        <div className={styles.cancel}>
          <button type="button" className={styles.cancelButton}>
            <Icon
              name="close"
              className={styles.cancelIcon}
              compact
              onClick={onCancel}
              size="small"
              {...iconProps}
            />
          </button>
        </div>
      )}
    </div>
  );
};

Callout.defaultProps = {
  borderless: false,
  className: '',
  compact: false,
  iconProps: {},
  onCancel: null,
  variant: 'info',
};

Callout.propTypes = {
  borderless: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  iconProps: PropTypes.object,
  /* Only renders exit button if function is set */
  onCancel: PropTypes.func,
  compact: PropTypes.bool,
  variant: PropTypes.oneOf(variants),
};

export default Callout;
