# <Responsive.Container />

Throw this component around a section of the DOM.
`<Responsive.Container>` provides width information to React components nested within it using the [React Context API](https://reactjs.org/docs/context.html).

This context information is designed to be consumed by the [`<Responsive.Element>`](/?path=/story/dark-matter-responsive-moons-element--overview) component.

This component takes breakpoints as an argument, and delivers a list of strings that indicate which breakpoints are active, which are larger than the current size, and which are smaller than the current size.

For example: when `<Responsive.Container>` is 600 - 899.9px wide, its children will access to the following `responsiveContext`:

```js
[
  'container-sm-up',
  'container-sm-down',
  'container-sm-only',
  'container-md-down',
  'container-lg-down',
];
```

You probably won't use all or most of the rules for `*-up`, `*-down`, and `*-only`

This pattern is taken from Bootstrap v4. You decide which functionality and styles you pin to a specific breakpoint or range of widths.

By default, it uses the following breakpoints:

| Breakpoint name | min-width (px) |
| --------------- | -------------- |
| `'xs'`          | 0              |
| `'sm'`          | 600            |
| `'md'`          | 900            |
| `'lg'`          | 1200           |
| `'xl'`          | 1800           |

## Custom breakpoints

You can any a replacement `customBreakpoints` prop in. It's just a list of keys and minWidths, so if you set ...

```js
{ name: 'banana', minWidth: 0 },
{ name: 'watermelon', minWidth: 100 },
{ name: 'kiwi', minWidth: 200 },
```

... then a container 100px wide or more would provide the following `responsiveContext` array:

```js
[
  'container-banana-up', // Apply styles for 0px or wider
  'container-watermelon-up', // Apply styles for 100px or wider
  'container-watermelon-down', // Apply styles for narrower than 200px
  'container-watermelon-only', // Apply styles for 100px - 199.9px
  'container-kiwi-down', // Apply styles for narrower than 200px
];
```
