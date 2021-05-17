# \<Checkbox\>

### Checkbox component is a thin wrapper around an HTML input[type="checkbox"] element

The basic `<Checkbox />` delegates all normal input behavior to the HTML element, and adds custom styles.

It also provides 1 custom prop:

- _fauxDisabled_: Applies the same style as disabled, but, unlike the real thing, doesn't stop propagation of events. Useful for adding tooltips or other helpful behavior when a user tries to interact with a disabled field. Because it doesn't stop click or change events, the consumer is responsible for making faux-disabled fields read-only.
