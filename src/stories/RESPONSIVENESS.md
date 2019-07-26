### Responsiveness

RoverUI includes a family of responsive components. They all rely on [container queries](https://css-tricks.com/container-query-discussion/), not media queries, via [react-container-query](https://www.npmjs.com/package/react-container-query).

Container queries look at the width of a parent DOM element, _not_ the whole viewport. This is important in a modular component system, because the component developer has no idea if the consumer will drop a component in a skinny modal or a full page layout.

For sanity's and performance's sake, the consumer is responsible for dropping a [`<Responsive.Container />`](http://localhost:9009/?path=/story/dark-matter-responsive-moons-container--overview) on the page. You'll send an array of breakpoints and widths on the container, and it will watch for changes to its own size. The container will then broadcast an array of generated responsive description strings to its children.

For flexibility, each breakpoint can generate one of more of these three descriptors:

- `container-{breakpoint}-up`
- `container-{breakpoint}-down`
- `container-{breakpoint}-only`

So, if you provide the breakpoints...

```jsx
breakpoints={[
  {
    minWidth: 0,
    name: 'foo',
  },
  {
    minWidth: 900,
    name: 'bar',
  }
]}
```

...and a container that's 500px wide, then descriptors for "foo", at least "foo" wide, and at most "foo" wide are all true. Your condition for at most "bar" wide is also true.

Any children of the container will have access to the context:

```js
[
  'container-foo-down',
  'container-foo-only',
  'container-foo-up',
  'container-bar-down',
];
```

To make working with containers a little easier, there's a [`<Responsive.Element>`](http://localhost:9009/?path=/story/dark-matter-responsive-moons-element--overview) component that turns the context into a prop for its child. Then the consumer can check the prop array's values and do whatever it wants responsively, from changing styles to layouts to behavior.

Finally, there's a [`<Responsive.Grid>`](http://localhost:9009/?path=/story/dark-matter-responsive-grid--overview) component. When you use it instead of the regular grid, you can provide an object of different grid props with the responsive breakpoint descriptors as keys.
