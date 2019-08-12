import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

import { propTypes } from '../../shared/models/tag';

const Paper = props => {
  const { className, flat, squared, tag: Tag, ...rest } = props;
  const classname = classNames(styles.Paper, className, {
    [styles.flat]: flat,
    [styles.squared]: squared,
  });
  return <Tag {...rest} className={classname} />;
};

Paper.propTypes = {
  className: PropTypes.string,
  squared: PropTypes.bool,
  flat: PropTypes.bool,
  tag: propTypes,
};

Paper.defaultProps = {
  className: '',
  squared: false,
  flat: false,
  tag: 'div',
};

export default Paper;
