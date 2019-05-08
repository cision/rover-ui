# Documentation outline

This outline only covers the content that should go in storybook documentation.

## Intro

---

RoverUI is a collection UI components that define TrendKite's design language. These components should help you build applications in React that look and feel right.

### Installation

---

Installing RoverUI as a consumer of the component library

### Usage

Consumer of the component library and using it in a React app, including instructions for webpack required config

#### Use css modules or some other strategy to minimize namespace conflicts and cascading CSS side-effects.

#### HOCs for style overrides? Tachyons?

#### CSS reset (if any)

#### Global styles (if any)

---

### Layout

What high-level page templates and grid system stuff are provided? Why this level of detail / utility?

---

### Responsiveness

What high-level responsive context is provided? When should you use responsive layouts vs. responsive or fluid components?

---

## Components

Each component should include a story called `<Component />` which is fully interactive and instrumented with knobs, but which includes no wrappers or boilerplate.

Each component should also include a story called `Example`, which describes the use of the component with relevant, embedded examples.

`<Component />` and `Example` pages should be linked. If a component has controlled and uncontrolled versions, those should also have cross-links.

---

#### Atoms

What is an atom?

##### List of atom components

---

#### Molecules

What is a molecule?

##### List of molecule components

---

#### Organisms

What is an organism?

##### List of organism components

---

#### Templates

What is a template?

##### List of template components

---

#### Higher-order components (HOCs)

What is a HOC?

##### List of HOCs

---

#### Utility methods

What is a utility method?

##### List of utility methods
