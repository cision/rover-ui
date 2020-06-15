import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Pill from '../Pill';

export const DeletablePill = ({ children, onDelete, ...passedProps }) => {
  return (
    <Pill {...passedProps}>
      {children}
      {passedProps.checked && (
        <Pill.Addon
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
          role="button"
          tabIndex={0}
        >
          <Icon name="clear" style={{ display: 'block' }} />
        </Pill.Addon>
      )}
    </Pill>
  );
};

DeletablePill.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onDelete: PropTypes.func.isRequired,
};

DeletablePill.defaultProps = {
  checked: false,
};

export default DeletablePill;
