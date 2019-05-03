# Button.Addon

### Button Addon is used for button children other than the text, such as icons

The `<Button.Addon/>` component can wrap any kind of node.

If your `<Button/>` includes one or more `<Button.Addon/>`s, then
the `<Button/>` will do two additional things.

1. `<Button/>` will propagate its `size` prop down to any
   `<Button.Addon/>` children.
2. `<Button/>` will wrap any bare text node children in
   `<span/>`s.

These 2 changes allow `<Button/>` to coordinate vertical alignment
and horizontal margins between the `<Button.Addon/>`s and their
siblings with CSS.
