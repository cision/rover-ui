import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Pill from '../Pill';

export const EasyPill = ({ actions, children, onDelete, ...passedProps }) => {
  return (
    <Pill {...passedProps}>
      {children}
      {passedProps.checked &&
        !!actions.length &&
        actions.map(action => (
          <Pill.Addon
            key={action.label}
            onClick={e => {
              e.stopPropagation();
              action.onClick(e);
            }}
          >
            {action.children || action.label}
          </Pill.Addon>
        ))}
      {passedProps.checked && onDelete && (
        <Pill.Addon
          onClick={e => {
            e.stopPropagation();
            onDelete(e);
          }}
        >
          <Icon name="clear" />
        </Pill.Addon>
      )}
    </Pill>
  );
};

EasyPill.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.string,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onDelete: PropTypes.func,
};

EasyPill.defaultProps = {
  actions: [],
  checked: false,
  onDelete: null,
};

export default EasyPill;
