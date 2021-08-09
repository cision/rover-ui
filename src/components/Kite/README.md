# \<Kite\>

**A configurable Kite component that automatically triggers onClose when the time to live interval elapses**

This component can be used as a toast that slides in from the top left to display information.

Below is an example structure of the `<Kite>`

```js
<Kite
  canBeDismissed
  icon={<Kite.Icon />}
  onClose={() => setVisible(false)}
  ttl={3000}
  visible={visible}
>
  <Kite.Header>Bold title</Kite.Header>
  <Kite.Body>Optional plain text / React node content</Kite.Body>
</Kite>
```

This will render a Kite with an icon, heading, and body content.

- The parent component controls visibility via the `onClose` callback and `visible` prop.
- If a `ttl` is provided, the component will call `onClose` that many ms after `visible` changes to `true`.
- `icon` and `children` can be anything React can render. Kites expert simple `Kite.Icon`, `Kite.Header`, and `Kite.Body` helpers. `Kite.Icon` uses the same interface as the base `Icon` component, and the heading and body provide some default spacing and font-weight variation.
- If `canBeDismissed` is false, the kite will not include a standard close button.
