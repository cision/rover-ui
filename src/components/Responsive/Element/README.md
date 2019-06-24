# <Responsive.Element />

Throw this component around another React component. It gets a list of
configured breakpoint strings that match its closest parent [`<Responsive.Container>`](/?path=/story/dark-matter-responsive-moons-container--overview)'s width as`responsiveContext` prop.

It uses the [React Context API](https://reactjs.org/docs/context.html), and is designed to work with `<Responsive.Container>`.

You can use the resulting prop to do whatever you want. Common uses would be showing/hiding DOM elements or adjusting styles.
