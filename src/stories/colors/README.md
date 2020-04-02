# COLORS

**These colors aren't exported for use in the public API.**

These are the only colors that you should find in RoverUI components.

This reference document is here to help RoverUI developers and designers align
the design system with component usage.

## Semantic color mappings vs full color palette

For most use cases, you can find a semantic color name ready to drop into a
component. These semantic color names are really just aliases for colors from
the full color palette.

The full color palette is organized into ramps with different color prefixes.
That's where you'll find the base hex value for `--rvr-blue`, which is used as
both `--rvr-color-primary` and `--rvr-color-info`.

It's also where you'll find a full range of grays, organized by lightness.

Using semantic colors is preferred, but early on in a component's development,
it may be easier to map to the raw palette until consistent patterns emerge.
