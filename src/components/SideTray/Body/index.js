import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const Body = ({ children, ...passedProps }) => {
  return (
    <div className={style.SideTray__Body} {...passedProps}>
      {children}
    </div>
  );
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Body;
