# Callout

The `Callout` component is a simple component that can be used to call attention to users information that they need to know or need to act on. Form submission, incomplete data, temporary outage, etc.

## Variants

- `success`
- `info`
- `warning`
- `danger`

## Want to skip borders?

Use the `borderless` property to remove the bottom border without having to use extra CSS

## Need a way to remove a Callout?

Provide the `onCancel` property with a function and the `close` Icon will display. It is up to the consumer of the `Callout` component to hide the callout.

## Compact

In case you need to handle a smaller space, you can use the `compact` property to reduce the padding a bit.

## Icon

Want to mess with the icon? Well, you can. Pass any props to the `iconProps` and these will be spread onto the `Icon` component

```jsx
<Callout iconProps={{ name: 'ad-equiv' }}>With custom icon</Callout>
```
