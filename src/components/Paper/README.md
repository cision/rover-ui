# Paper

Paper provides a nice clean wrapper to separate pieces of content.

```js
<Paper>
  <div>Text or children of any kind</div>
</Paper>
```

## Options

Boolean options are `flat` and `squared`. `flat` simply removes the box shadow and `squared` removes the border radius. If you need to adjust styles more than that, you may pass in `className` or `style` props as you would with normal HTML tags.

```js
<Paper>
  <Paper squared className="custom-classname">
    {SampleText}
  </Paper>
  <Paper flat style={{ backgroundColor: 'red' }}>
    {SampleText}
  </Paper>
</Paper>
```
