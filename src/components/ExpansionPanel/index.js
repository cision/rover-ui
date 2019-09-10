import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isBoolean from 'lodash/isBoolean';

import { combinePropTypes } from '../../shared/propTypes';
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
      {header &&
        React.cloneElement(header, { expanded, onClick: handleToggle })}
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
  /* eslint-disable react/require-default-props */
  children: combinePropTypes(PropTypes.node.isRequired, props => {
    const children = React.Children.toArray(props.children);
    if (children[0].type !== Header) {
      return new Error(
        'ExpansionPanel: only accept a ExpansionPanel.Header as first child.'
      );
    }
  }),
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
  collapseProps: {},
  defaultExpanded: null,
  expanded: false,
  onToggle: undefined,
};

ExpansionPanel.Header = Header;
ExpansionPanel.Body = Body;

export default ExpansionPanel;
