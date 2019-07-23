# RoverUI

RoverUI is a collection of UI components for React. It's built for and by Cision, but the components should be business-agnostic.
These components should help the Cision team build applications that look hot, in React, quickly.

---

### Installation

From the command line:

```bash
# Using yarn
yarn add "@cision/rover-ui"
```

```bash
# Using npm
npm install --save "@cision/rover-ui"
```

In your React file:

```jsx
import React from 'react';
import { Button } from '@cision/rover-ui';

const CustomComponent = props => {
  return (
    <Button {...props} onClick={props.customOnClick}>
      My Button
    </Button>
  );
};

export default CustomComponent;
```

---

### Usage

RoverUI has peer dependencies on...

- react ^16.8.0
- prop-types ^15.5.4
- react-dom ^16.8.0"

That means your app must include compatible versions of those packages in your package.json. RoverUI doesn't come with that code.

#### Styles and customization

RoverUI doesn't currently provide a CSS reset, because of the risk of overriding styles from consuming apps. RoverUI doesn't ship any global styles.

The project is also in an alpha release, and one of the areas in flux is theming and appearance customization.

Currently, you can control the appearance of RoverUI components in a few way:

##### Customize single components with props (recommended)

All RoverUI components should at least let the user add custom `className` and `styles` props to the outer wrapper, which gives some outlet for customization.

The other 2 ways of customizing currently require custom builds, and aren't recommended. The team is actively working on adopting a single standard for theming.
Afterwards, we try to enable theme changes without custom builds.

##### Customize the theme with a custom build

You can customize RoverUI completely by cloning the repo and making a custom build. See the [project README](https://github.com/cision/rover-ui/blob/master/README.md) for more details.

### Development

See the [project README](https://github.com/cision/rover-ui/blob/master/README.md) for more details.

---

## Components

We use an unusual taxonomy for categorizing our components. It's based off the idea of the [Atomic Design Methodology](http://atomicdesign.bradfrost.com/chapter-2/).
Because we're intending components for broader, business-agnostic re-use, we wanted a separate naming convention to avoid conflating Atom Design Methodology terms with ours.

We have a scale from simple to complex: from planets to galaxies.
We added the tier "dark matter" to capture components that only exist to maintain the spatial relationships of other components.

#### Planets

Planets are the smallest level of component in our universe.
Components in this category must be stateless, include only one DOM element, and pass all props (including children and DOM event handlers), eg: Paper, Typography, Button, simple text input

---

#### Star systems

Star systems consume one or more planets, and can have state as needed but should be minimal, eg: Button group, dropdown toggle, checkbox group

---

#### Galaxies

Galaxies have one or more star systems, and can also include planets, eg: form, calendar range picker

---

#### Dark matter

These components aren't opinionated about the children's appearance, just the layout, eg: Responsive layout

---

#### Higher-order components (HOCs)

HOCs are functions that take a component and spit out a modified component. If you've used Redux, `connect` is a HOC. We currently only use HOCs for consolidating logic around theme and appearance.

---

#### Looking forward

The next big steps for RoverUI are:

- Improving documentation and builds so new consumers and contributors can get running quickly.
- Finalizing and improving the model for theming and appearance customization at run-time.
- Adding components

Let us know what you'd like to see added on the [issue tracker](https://github.com/cision/rover-ui/issues).
