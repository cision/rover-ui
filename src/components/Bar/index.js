import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

export const Bar = ({
  bg,
  borderRadius,
  className,
  fill,
  height,
  rounded,
  style,
  width,
  ...props
}) => {
  const background = fill || bg;

  if (bg) {
    // eslint-disable-next-line no-console
    console.warn(
      'DEPRECATED: uing the `bg` property in a <Bar> or <Fill> component will not be supported in the next major version'
    );
  }

  if (height) {
    // eslint-disable-next-line no-console
    console.warn(
      'DEPRECATED: uing the `height` property in a <Bar> or <Fill> component will not be supported in the next major version'
    );
  }

  if (borderRadius) {
    // eslint-disable-next-line no-console
    console.warn(
      'DEPRECATED: uing the `borderRadius` property in a <Bar> or <Fill> component will not be supported in the next major version'
    );
  }

  return (
    <div
      style={{ background, borderRadius, width, height, ...(style || {}) }}
      {...props}
      className={classNames(styles.Bar, className, {
        [styles.rounded]: rounded,
      })}
    />
  );
};

Bar.defaultProps = {
  bg: '',
  borderRadius: '',
  className: '',
  fill: '',
  height: '',
  rounded: true,
  style: {},
  width: '',
};

Bar.propTypes = {
  bg: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.string,
  rounded: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.string,
};

const Fill = props => (
  <Bar rounded={false} className={styles.Fill} {...props} />
);

Bar.Fill = Fill;

export default Bar;
