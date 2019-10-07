# Badge

_Badges are used for additional information_

The badge background color is controled by the `color` prop. Any of the semantic colors can be overridden using the `variant` prop.

**Valid Variants:**

- dark
- light
- danger
- notify
- warning
- info
- success

`Badge` can also take a custom `tag` attribute if you want your badge to use a different tag than the default `<span>`

```js
const badgeWrapStyle = { marginRight: '10px' };

<div style={{ display: 'flex', alignItems: 'baseline' }}>
  <div style={badgeWrapStyle}>
    <Badge variant="info">Print</Badge>
  </div>
  <div style={badgeWrapStyle}>
    <Badge tag="div" variant="info">
      Broadcast
    </Badge>
  </div>
  <div style={badgeWrapStyle}>
    <Badge tag="h5" variant="info">
      Radio
    </Badge>
  </div>
</div>;
```

**Note**: If you are trying to have spacing around or between badges lined up next to each other, it should be controlled by the parent element instead of the `<Badge>` itself.
