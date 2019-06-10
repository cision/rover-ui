# Responsive utility components

See:

- [`<Responsive.Container>`](/?path=/story/planets-responsive-moons-container--sandbox)
- [`<Responsive.Element>`](/?path=/story/planets-responsive-moons-element--sandbox)

1. `<Responsive.Container>` measures the width of a section of the DOM (called a **container**) and watch for changes.
2. `<Responsive.Container>` compares the width of the container against a list of breakpoints.
3. `<Responsive.Element>` tells its child elements which breakpoints match the container's current width via a `responsiveContext` prop.

## When this is better than a media query

If you're used to using media queries, this will be a bit different. The breakpoints apply to a sub-section of the DOM, not the whole page.

That's great for re-usable components because they aren't tied to the state of the layout any more than necessary.

Imagine you're working with a React component for a `<Person>`. Maybe the same Person object can appear in list of people in the sidebar, a list of people in the main content area, or a modal for viewing a single person.

Let's imaging the `<Person>` component can be rendered in a compact, regular, or large modes. In medium mode, a regular avatar appears to the left of a stacked name and description. A large mode might simply employ a larger avatar, while a small mode might put the avatar on its own line above the name and description.

Whatever the case, we'll need to use a different variant of the Person component depending on how much horizontal space we have.

### The old way - top-down responsiveness

A top-down layout approach would be using a CSS-based grid system to separate the sidebar (3 grid units wide) from the main content (9 units wide) and modal (12 units wide, but on a grid inside a modal that's only 50% of the width of the page).

For each use of the `<Person>` component, the implementer would pass in some kind of prop to control the variant.

If you ever have nested layout changes, the system becomes unwieldy.

For instance, the sidebar could disappear based on a user action or change from 3 grid units to 4 grid units based on page size. Now you need logic for your layout to change the mode of the `<Person>` component's mode prop based on the state of the app and the viewport.

### Better - using container queries

With container queries, the implementer chooses where to put a responsive container for breakpoints. In this example, you could add a responsive container on the sidebar, one on the main content area, and one on the modal.

Those areas will independently measure their width and pass down context information to their children every time they're resized. In our example, that means there's no logic in the sidebar's instance of `<Person>`. Person just knows to use the small mode when narrower than 600px, and the sidebar reports whether it's above or below 600px whenever it's resized.
