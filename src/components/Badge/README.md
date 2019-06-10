# Badge

#### Badges are used for additional information

The badge background color is controled by the \`color\` prop.
Any of the semantic colors can be overridden by \`darkMode = true\`.
Color is optional, will default to very light gray background.

**Valid Variants:**

- dark
- light
- danger
- notify
- warning
- info
- success

If you are trying to have spacing around or between badges lined up next to each other, it must be controlled by a parent div like so:

```js
const badgeWrapStyle = { marginRight: '10px' };

<div style={{ display: 'flex', alignItems: 'baseline' }}>
  <div style={badgeWrapStyle}>
    <Badge color="info">Print</Badge>
  </div>
  <div style={badgeWrapStyle}>
    <Badge color="info">Broadcast</Badge>
  </div>
  <div style={badgeWrapStyle}>
    <Badge color="info">Radio</Badge>
  </div>
</div>;
```
