# Paper

Paper provides a nice clean wrapper to separate pieces of content.

```js
<Paper>
  <div>Text or children of any kind</div>
</Paper>
```

## Options

The `<Paper>` wraper supports the `color`, `space`, `borderRadius` props from the `styled-system` utilities and supports theming using the default theme.

```js
<Paper padding={3} bg="gray" color="white">
  <Paper borderRadius={0} p={6}>
    {SampleText}
  </Paper>
  <Paper borderRadius={0} bg="green" color="white">
    {SampleText}
  </Paper>
</Paper>
```

You can also pass strings as explicit CSS property values instead of using the provided theme's `space` options.

```js
<Paper py="20px" px="10px">
  // moar children
</Paper>
```
