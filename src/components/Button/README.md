# Button

### Button component is used for all links and calls to action, as well as triggers for dropdowns

The `<Button/>` component can wrap any kind of node.

By default, it creates a `<button>` tag, and it propagates down all
the props it doesn't use for appearance.

That means it will propagate all DOM events that react supports, like
`onClick`, `onFocus`, etc.

You can change the tag name (aka DOM element) to something like `a`
or `div`. If you do, React will allow different props. It's up to
you to not put an `href` on a `button`.
