# Responsive.Grid

**Build grids that change layout based on container width.**

When you use a `Responsive.Container`, it sets up a container width watcher with pre-defined breakpoints.
You can use those breakpoints to make grids that change layout based on container width.

You can adjust all the basic grid's layout props.

- an entry clearing to a new row
- an entry spanning multiple columns
- adding columns of empty space before an entry

See [`<Grid>`](/?path=/story/dark-matter-grid--sandbox) for details on configurability:

To use these features, you just need a `breakpoints` prop that maps breakpoint query names to the customized props.

For instance, Grid has (number of) columns and (size of) gutter props. To set them responsively, use the prop ...

```
// At 'md' size and wider, the grid will be 3 column, with xl gutters.
// At other sizes, it will be 1 column with no gutter.
<Responsive.Grid
  breakpoints={{ 'container-md-up': { columns: 3, gutter: 'xl' } }}
  columns={1}
  gutter="no"
  ...
```

The same pattern works with grid entries.

```
// At 'md' size and wider, this div will clear to a new line, span 2 columns, and have 1 column of empty space before it.
<Responsive.Grid>
  ...
  <div
    breakpoints={{ 'container-md-up': { clear: true, colSpan: 2, offset: 1 } }}
  ...
```
