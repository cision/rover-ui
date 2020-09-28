import React, {
  useState,
  ReactElement,
  FC,
  SyntheticEvent,
  Children,
  cloneElement,
} from 'react';

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  defaultExpandedPanel?: number | null;
}

const Accordion: FC<AccordionProps> = ({
  children,
  defaultExpandedPanel,
  ...passedProps
}) => {
  const [expandedPanel, setExpandedPanel] = useState(defaultExpandedPanel);

  const handleToggle = (
    panel: number,
    onToggle: (event: SyntheticEvent, expanded: boolean) => void
  ) => (event: SyntheticEvent, expanded: boolean) => {
    setExpandedPanel(expanded ? panel : null);

    if (onToggle) {
      onToggle(event, expanded);
    }
  };
  return (
    <div {...passedProps}>
      {children &&
        Children.map(
          children as React.ReactElement[],
          (child: ReactElement, index) =>
            cloneElement(child, {
              ...child.props,
              defaultExpanded: undefined,
              expanded: index === expandedPanel,
              onToggle: handleToggle(index, child.props.onToggle),
            })
        )}
    </div>
  );
};

export default Accordion;
