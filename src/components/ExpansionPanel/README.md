# \<ExpansionPanel\>

`ExpansionPanel` component takes advantage of `Collapse` component behavior to create a fully customizable expansion panel. You can

`ExpansionPanel` component was thought to be used with `ExpansionPanel.Header` and `ExpansionPanel.Body` components where `ExpansionPanel.Header` is expected to be the first child.

1. `<ExpansionPanel>` Controls the expand/collapse behavior and renders the header and body.
2. `<ExpansionPanel.Header>` renders header with an optional expand icon (animated).
3. `<ExpansionPanel.Body>` renders the panel content.

## Controlled & Uncontrolled

If `defaultExpanded` is set, the component will start in uncontrolled mode where the provided value will expand or collapse the panel in the first render.

If you don't define `defaultExpanded`, the component will start in fully controlled mode, and you have to provide an `expanded` boolean and an `onToggle` function that changes it. (Even in controlled mode, `onToggle` will fire as a convenience callback.)
