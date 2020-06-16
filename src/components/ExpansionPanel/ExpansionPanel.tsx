import React, { useState, ReactElement } from 'react';
import isBoolean from 'lodash/isBoolean';

import Collapse from '../Collapse';
import Header from './Header';
import Body from './Body';
import { CollapseProps } from '../Collapse/Collapse';

interface ExpansionPanelProps {
  collapseProps?: CollapseProps;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggle?: (event: React.SyntheticEvent, expanded: boolean) => void;
}

type ExpansionPanelAllProps = ExpansionPanelProps &
  React.AllHTMLAttributes<HTMLDivElement>;

interface ExpansionPanelType extends React.FC<ExpansionPanelAllProps> {
  Header: typeof Header;
  Body: typeof Body;
}

const ExpansionPanel: ExpansionPanelType = ({
  children,
  collapseProps = {},
  defaultExpanded = null,
  expanded: expandedProp = false,
  onToggle = undefined,
  ...passedProps
}) => {
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(
    defaultExpanded
  );
  const isControlled = !isBoolean(defaultExpanded);
  const expanded = isControlled ? expandedProp : uncontrolledExpanded;
  const [header, ...body] = React.Children.toArray(children);

  // @ts-ignore
  if (header.type.displayName !== Header.displayName) {
    throw new Error(
      'The first child of an ExpansionPanel *must* be an ExpansionPanel.Header'
    );
  }

  const handleToggle = (event: React.SyntheticEvent) => {
    if (!isControlled) {
      setUncontrolledExpanded((prev) => !prev);
    }
    if (onToggle) {
      onToggle(event, !expanded);
    }
  };

  return (
    <div {...passedProps}>
      {header &&
        React.cloneElement(header as ReactElement, {
          expanded,
          onClick: handleToggle,
        })}
      <Collapse isOpen={expanded ?? false} {...collapseProps}>
        {body}
      </Collapse>
    </div>
  );
};

ExpansionPanel.Header = Header;
ExpansionPanel.Body = Body;

export default ExpansionPanel;
