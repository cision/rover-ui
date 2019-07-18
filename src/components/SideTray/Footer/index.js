import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const Footer = ({ children, ...passedProps }) => {
  return (
    <div className={style.SideTray__Footer} {...passedProps}>
      <div className={style.inner}>{children}</div>
    </div>
  );
};

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
