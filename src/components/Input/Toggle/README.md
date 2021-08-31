# \<Toggle\>

A div wrapper with html input element for toggle functionality.

Optional props

- _checked_ default false
- _fauxDisabled_ default false
  - Applies the same style as disabled, but, unlike the real thing, doesn't stop propagation of events. Useful for adding tooltips or other helpful behavior when a user tries to interact with a disabled field. Because it doesn't stop click or change events, the consumer is responsible for making faux-disabled fields read-only.
