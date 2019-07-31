import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Pill from '../Pill';

export const DeletablePill = ({ children, onDelete, ...passedProps }) => {
  return (
    <Pill {...passedProps} onClick={passedProps.checked ? onDelete : undefined}>
      {children}
      {passedProps.checked && (
        <Pill.Addon>
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
