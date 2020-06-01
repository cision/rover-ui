# \<Input\>

### Input component is a thin wrapper around an HTML input element

The basic `<Input />` doesn't add any behavior to the HTML element, it just adds styles.

It also provides 1 custom prop

- _fauxDisabled_: Applies the same style as disabled, but, unlike the real thing, doesn't stop click events. Useful for adding tooltips or other helpful behavior when a user tries to interact with a disabled field.
