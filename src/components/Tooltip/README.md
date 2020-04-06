# \<Tooltip\>

Adds a tooltip to any content.

```jsx
<Tooltip content="I will show up">
  <Button disabled>Show a tooltip for why I'm disabled</Button>
</Tooltip>
```

You can customize the direction of the tooltip using the `direction` prop

```jsx
<Tooltip direction="left" text="Hi! I'm on the left">
  <span>Hover over me to show a tooltip</span>
</Tooltip>
```

## `content`

To show more complex content, you will need to set another property alongside the `content` prop: `tooltipWidth`. Without a width property, the tooltip's width is _likely_ not going to match the width you want/need. It may be too narrow or too wide.

```jsx
const OtherComponent = () => {
  return (
    <>
      <h4>:wave:</h4>
      <p>I can be any content your little heart desires</p>
    </>
  ):
}

<Tooltip tooltipWidth="400px" content={<OtherComponent />}>
  I'm showing more complex content!
</Tooltip>
```

### `isOpen` and `onClose`

The final key property is the `onClose` prop. This prop takes a _function_ in order to activate. You will also need to control the tooltip's visibility with the `isOpen` property.

```jsx
const [tooltipOpen, setTooltipOpen] = useState(false);
const toggle = () => { setTooltipOpen(prev => !prev)}};
<Tooltip
  isOpen={tooltipOpen}
  tooltipWidth="400px"
  onClose={toggle}
  content={<OtherComponent />}
>
  I'm showing more complex content... and I can be closed!
</Tooltip>
```

## EasyRichTooltip

If you have rich content (i.e. more than just simple text), you will probably find yourself defining a lot of props to make a Tooltip work. Typically, this just sets default values, but since we are having to handle toggling visibility of an element from within the Tooltip's children, we can use the
returned function to `open`, `close`, or `toggle` the tooltip.

```jsx
/* This is so much nicer! */
<EasyRichTooltip content={<TooltipContent />} tooltipWidth="300px">
  {({ toggle, open, close }) => (
    <Button onClick={toggle}>Toggle the tooltip!</Button>
    <Button onClick={open}> Will only open the tooltip</BUtton>
    <Button onClick={close}> Will only close the tooltip</BUtton>
  )}
</EasyRichTooltip>
```
