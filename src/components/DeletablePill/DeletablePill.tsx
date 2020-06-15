import React from 'react';

import Icon from '../Icon';
import Pill, { PillProps } from '../Pill/Pill';

interface DeletablePillProps extends PillProps {
  onDelete: (e: React.SyntheticEvent) => void;
}

export const DeletablePill: React.FC<DeletablePillProps> = ({
  children,
  checked = false,
  onDelete,
  ...passedProps
}) => {
  return (
    <Pill checked={checked} {...passedProps}>
      {children}
      {checked && (
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

export default DeletablePill;
