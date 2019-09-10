# \<Accordion\>

This components takes an arbitrary amount of `ExpansionPanel` components as children and only allows one of them to be expanded at the same time.

In order to work, the `ExpansionPanel` will force every panel to be a controlled panel (`defaultExpanded` prop will be overrided).

Use `defaultExpandedPanel` prop if you want to set one of the panels as expanded in the first render. It expects a number starting from 0.
