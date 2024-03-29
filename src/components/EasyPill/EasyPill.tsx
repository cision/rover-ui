import React from 'react';

import Media from '../Media';
import EasyDropdown from '../EasyDropdown';
import Icon from '../Icon';
import Pill from '../Pill';
import { PillProps } from '../Pill/Pill';
import styles from './EasyPill.module.css';
import type { MenuItem } from '../EasyDropdown/EasyDropdown';
import Tooltip from '../Tooltip';
import { TooltipDirection } from '../Tooltip/Tooltip';

interface EasyPillProps extends PillProps {
  actions?: MenuItem[];
  children?: React.ReactNode;
  onDelete?: (...args) => void;
  tooltip?: string;
  tooltipDirection?: TooltipDirection;
}

interface EasyPillDropdownProps {
  actions: MenuItem[];
  onDelete?: (...args) => void;
}

const EasyPillDropdown: React.FC<EasyPillDropdownProps> = ({
  actions,
  onDelete = () => {},
}) => {
  if (!actions?.length) {
    return null;
  }

  const menuItems = [...actions];

  if (onDelete) {
    menuItems.push({
      group: 'deletePill',
      label: 'Delete',
      children: (
        <Media>
          <Media.Item className={styles.dropdownDeleteIcon}>
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
      disabled={false}
      isOpen={false}
      onToggle={() => {}}
      toggleProps={{}}
      className=""
    >
      {/* The onClick action is handled by EasyDropdown */}
      <div role="button" tabIndex={0}>
        <Icon name="ellipsis-v" style={{ display: 'block' }} />
      </div>
    </EasyDropdown>
  );
};

export const EasyPill: React.FC<EasyPillProps> = ({
  actions,
  children,
  onDelete,
  tooltip,
  tooltipDirection = 'top-right',
  ...passedProps
}) => {
  const renderIconWithOptionalTooltip = () => {
    return tooltip ? (
      <Tooltip
        content={<span className={styles.tooltipText}>{tooltip}</span>}
        direction={tooltipDirection}
        showOnHover
      >
        <Icon style={{ display: 'block' }} name="clear" />
      </Tooltip>
    ) : (
      <Icon style={{ display: 'block' }} name="clear" />
    );
  };

  return (
    <Pill {...passedProps}>
      {children}
      {passedProps.checked &&
        (actions?.length ? (
          <Pill.Addon onClick={(e) => e.stopPropagation()}>
            <EasyPillDropdown actions={actions} onDelete={onDelete} />
          </Pill.Addon>
        ) : (
          onDelete && (
            <Pill.Addon
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e);
              }}
            >
              {renderIconWithOptionalTooltip()}
            </Pill.Addon>
          )
        ))}
    </Pill>
  );
};

export default EasyPill;
