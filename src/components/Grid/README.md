# Grid

**Build flexible layouts with a configurable number of columns using the grid.**

The \`columns\` prop controls how many columns are in the grid. Grids wrap, so having more entries than columns will add additional rows.
Hanging entries will _not_ fill the additional remaining space in the row.

The \`gutter\` prop sets horizontal and vertical gutters, and can take ...

- a number, e.g. \`20\` -> 20px
- a CSS unit string, e.g. \`"20rem"\`
- a spacing size from the current theme, e.g. \`"xl"\`

As always, you can pass a custom \`className\` prop.

## Entries

Grids will automatically wrap each direct child element in an "entry" div, which sets gutters.
By adding \`offset\` and \`colSpan\` attributes to the children, you can modify their size and position.

Make a single element wider to cover multiple columns by setting \`colSpan\`.

Add one or more empty columns before an element with \`offset\`.

Force an entry to break to a new line with \`clear\`.

You can set elements to extend outside the grid area with these attributes, so be careful.
