# \<Dropdown.Menu\>

This dropdown menu should _always_ be a direct child of a `Dropdown` component.

The `Dropdown.Menu` takes a `position` props, that gives it absolute positioning. The `Dropdown` component sets a `position: relative` frame of reference for the menu.

It also inherits an `isOpen` context via the React context API. This is automatically set by the `Dropdown` as well.

It provides:

- background
- positioning relative to its `position: relative` parent
- z-index
- animated transition on toggle.
- close on "Escape" key
- close on click outside key
