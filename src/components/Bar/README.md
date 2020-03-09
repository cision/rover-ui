# Bar

`<Bar>` with `<Bar.Fill>` is a general purpose way to indicate the progress of something that is happening or visually display a percentage.

```jsx
<Bar>
  <Bar.Fill width="14%" fill="#3398db">
  {/* You can use any valid CSS color */}
  <Bar.Fill width="57%" fill="rebeccapurple">
</Bar>
```

**Note**: Both the `Bar` as well as the `Bar.Fill` components use the same properties. The only difference is that `Bar.Fill` sets some reasonble defaults since it's designed to be nested within a `Bar` component

## Properties

- `fill` - Background color to customize the look of the bar or fill
- `width` - How wide to make the bar or fill component
- `rounded` - Give bar more rounded shape. Enabed by default.
- `style`
- `className`

### Deprecated Properties

The `bg` and `borderRadius` properties are no longer supported. These were used in the inital versions of RoverUI which used `styled-system`. Prefer to pass custom border radius as part of a `style` tag and use the `fill` property as the custom background color.
