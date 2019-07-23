### Layout (Dark matter)

RoverUI's layout components are called "Dark matter". Like the hypothetical substance filling the gaps of the universe, dark matter components don't make any visible changes to the appearance of your app's contents directly. Instead, they affect the spatial relationships of your components.

All dark matter components should render their children without modification.

### Grid

RoverUI includes a grid component for arranging elements in fluid grids with a configurable column count and gutters. Items will automatically wrap, and there are special attributes you can put on children to make them span columns and push them forward or back along a single row.

The [`<Grid>`](/?path=/story/dark-matter-grid--overview) is influenced heavily by [Bootstrap](https://getbootstrap.com/docs/4.0/layout/grid/).

### Media

RoverUI includes a media component for aligning one or more fixed width items at the beginning or end of a fluid width content area, with guards against weird wrapping and alignment issues.

The [`<Media>`](/?path=/story/dark-matter-media--overview) family of components is influenced by [Bootstrap's Media object](https://getbootstrap.com/docs/4.0/layout/media-object/), inspired originally by [Stubbornella's 2010 blog post](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/).
