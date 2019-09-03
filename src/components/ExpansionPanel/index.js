import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isBoolean from 'lodash/isBoolean';
import isEmpty from 'lodash/isEmpty';

import Collapse from '../Collapse';
import Header from './Header';
import Body from './Body';

const ExpansionPanel = ({
  children,
  collapseProps,
  defaultExpanded,
  expanded: expandedProp,
  onToggle,
  ...passedProps
}) => {
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(
    defaultExpanded
  );
  const isControlled = !isBoolean(defaultExpanded);
  const expanded = isControlled ? expandedProp : uncontrolledExpanded;
  const [header, ...body] = React.Children.toArray(children);

  const handleToggle = event => {
    if (!isControlled) {
      setUncontrolledExpanded(!expanded);
    }
    if (onToggle) {
      onToggle(event, !expanded);
    }
  };

  return (
    <div {...passedProps}>
      {React.cloneElement(header, { expanded, onClick: handleToggle })}
      <Collapse isOpen={expanded} {...collapseProps}>
        {body}
      </Collapse>
    </div>
  );
};

ExpansionPanel.propTypes = {
  /**
   * The content of the expansion panel.
   */
  children: props => {
    const children = React.Children.toArray(props.children);
    if (isEmpty(children)) {
      return new Error('ExpansionPanel: children is required.');
    }
    if (children[0].type !== Header) {
      return new Error(
        'ExpansionPanel: only accept a ExpansionPanel.Header as first child.'
      );
    }
    return null;
  },
  /**
   * Props passed to the `Collapse` component.
   */
  collapseProps: PropTypes.shape({ ...Collapse.propTypes }),
  /**
   * If set, the panel will start in uncontrolled mode.
   * If `true`, the panel starts expanded, otherwise collapsed.
   */
  defaultExpanded: PropTypes.bool,
  /**
   * If `true`, expands the panel, otherwise collapse it.
   * Setting this prop enables control over the panel.
   */
  expanded: PropTypes.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {boolean} expanded The `expanded` state of the panel.
   */
  onToggle: PropTypes.func,
};

ExpansionPanel.defaultProps = {
  expanded: false,
};

ExpansionPanel.Header = Header;
ExpansionPanel.Body = Body;

export default ExpansionPanel;
