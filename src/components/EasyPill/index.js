import React from 'react';
import PropTypes from 'prop-types';

import Media from '../Media';
import EasyDropdown from '../EasyDropdown';
import Icon from '../Icon';
import Pill from '../Pill';

const EasyPillDropdown = ({ actions, onDelete }) => {
  if (!actions.length) {
    return null;
  }

  const menuItems = [...actions];

  if (onDelete) {
    menuItems.push({
      group: 'deletePill',
      label: 'Delete',
      children: (
        <Media>
          <Media.Item mr="md" alignSelf="center">
            <Icon
              height={16}
              name="trash"
              style={{ display: 'block' }}
              width={16}
            />
          </Media.Item>
          <Media.Body>Delete</Media.Body>
        </Media>
      ),
      onClick: onDelete,
    });
  }

  return (
    <EasyDropdown
      style={{ display: 'block' }}
      menuProps={{ position: 'bottomLeft' }}
      menuItems={menuItems}
      defaultIsOpen={false}
    >
      {/* The onClick action is handled by EasyDropdown */}
      <div role="button" tabIndex={0}>
        <Icon name="ellipsis-v" style={{ display: 'block' }} />
      </div>
    </EasyDropdown>
  );
};

export const EasyPill = ({ actions, children, onDelete, ...passedProps }) => {
  return (
    <Pill {...passedProps}>
      {children}
      {passedProps.checked && (
        <Pill.Addon onClick={(e) => e.stopPropagation()}>
          <EasyPillDropdown actions={actions} onDelete={onDelete} />
        </Pill.Addon>
      )}
      {passedProps.checked && !actions.length && onDelete && (
        <Pill.Addon
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
        >
          <Icon style={{ display: 'block' }} name="clear" />
        </Pill.Addon>
      )}
    </Pill>
  );
};

EasyPill.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.node,
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

EasyPillDropdown.propTypes = {
  actions: EasyPill.propTypes.actions.isRequired,
  onDelete: EasyPill.propTypes.onDelete,
};

EasyPillDropdown.defaultProps = {
  onDelete: EasyPill.defaultProps.onDelete,
};

export default EasyPill;
