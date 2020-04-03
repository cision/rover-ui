# \<Tooltip\>

Adds a tooltip to any content.

```jsx
<Tooltip text="I will show up">
  <Button disabled>Show a tooltip for why I'm disabled</Button>
</Tooltip>
```

The content within the tooltip can be set using two separate props:

1. `text` - Auto-expands the width of the tooltip. Very basic
2. `content` - Any kind of other, more complex content (think any React Component)

You can customize the direction of the tooltip using the `direction` prop

```jsx
<Tooltip direction="left" text="Hi! I'm on the left">
  <span>Hover over me to show a tooltip</span>
</Tooltip>
```

## `content`

To show more complex content, you will need to set another property alongside the `content` prop: `width`. Without a width property, the tooltip's width is _likely_ not going to match the width you want/need. It may be too narrow or too wide.

```jsx
const OtherComponent = () => {
  return (
    <>
      <h4>:wave:</h4>
      <p>I can be any content your little heart desires</p>
    </>
  ):
}

<Tooltip width="400px" content={<OtherComponent />}>
  I'm showing more complex content!
</Tooltip>
```

### `open` and `closeable`

The final key property is the `closeable` prop. This prop takes a _function_ in order to activate. You will also need to control the tooltip's visibility with the `open` property.

```jsx
const [tooltipOpen, setTooltipOpen] = useState(false);
const toggle = () => { setTooltipOpen(prev => !prev)}};
<Tooltip
  open={tooltipOpen}
  width="400px"
  closeable={toggle}
  content={<OtherComponent />}
>
  I'm showing more complex content... and I can be closed!
</Tooltip>
```
