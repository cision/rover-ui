import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import style from './style.css';
import ClearIcon from '../../icons/clear.js';

const Pill = ({ children, id, selected, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(style.pill, {
        [style.selected]: selected,
      })}
      onClick={() => onClick(id)}
    >
      {children}
      {selected && <ClearIcon className={style.clear} />}
    </div>
  );
};

Pill.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Pill.defaultProps = {
  selected: false,
};

export default Pill;
