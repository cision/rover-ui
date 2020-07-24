import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ defaultExpandedPanel, children, ...passedProps }) => {
  const [expandedPanel, setExpandedPanel] = useState(defaultExpandedPanel);

  const handleToggle = (panel, onToggle) => (event, expanded) => {
    setExpandedPanel(expanded ? panel : null);
    if (onToggle) {
      onToggle(event, expanded);
    }
  };

  return (
    <div {...passedProps}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          ...child.props,
          defaultExpanded: undefined,
          expanded: index === expandedPanel,
          onToggle: handleToggle(index, child.props.onToggle),
        })
      )}
    </div>
  );
};

Accordion.propTypes = {
  /**
   * Group of expansion panels.
   */
  children: PropTypes.node,
  /**
   * Index of default expanded panel starting from 0.
   */
  defaultExpandedPanel: PropTypes.number,
};

Accordion.defaultProps = {
  children: null,
  defaultExpandedPanel: null,
};

export default Accordion;
