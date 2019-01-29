import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.css';
import withPadding from '../withPadding';

const Paper = ({ dark, className, ...props }) => {
  const classes = classNames(
    styles.Paper,
    {
      [className]: !!className,
      [styles.dark]: dark,
    },
  );

  const passprops = {
    ...props,
    className: classes,
  };

  return <div {...passprops} />;
};

Paper.defaultProps = {
  children: null,
  className: '',
  dark: false,
  style: {},
};

Paper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dark: PropTypes.bool,
  style: PropTypes.object,
};

export default withPadding(Paper);
