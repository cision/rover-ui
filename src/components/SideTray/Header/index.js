import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const Header = ({ children, ...passedProps }) => {
  return (
    <div className={style.SideTray__Header} {...passedProps}>
      <div className={style.inner}>{children}</div>
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
