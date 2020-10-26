# RoverUI

> UI Component Library used at Cision

[![NPM](https://img.shields.io/npm/v/@cision/rover-ui.svg)](https://www.npmjs.com/package/@cision/rover-ui)
[![Tests](https://github.com/cision/rover-ui/workflows/Tests/badge.svg)](#install)

RoverUI is a collection of UI components originally built for and by Cision. These components should help the Cision team build applications that look hot, in React, quickly.

## Install

```sh
# yarn
yarn add @cision/rover-ui
```

```sh
# npm
npm install --save @cision/rover-ui
```

For more instructions on installing and using the RoverUI package in your app, see the [docs in Storybook](https://cision.github.io/rover-ui)

To install and develop or run locally, you're in the right place.

## Usage

```jsx
import React, { Component } from 'react';

import { Media } from '@cision/rover-ui';

class Example extends Component {
  render() {
    return (
      <Media>
        <Media.Item>👋🏻</Media.Item>
      </Media>
    );
  }
}
```

## Contributing

See our [Contribution guidelines](./CONTRIBUTING.md) for more information.

## Reporting issues

Report issues at the [GitHub issue tracker](https://github.com/cision/rover-ui/issues).

## Champions

Champions are admins, but they're also people who've been involved for a while
and have a lot of investment in the project.

The main RoverUI champions currently are:

- [@dkordik](https://github.com/dkordik)
- [@mdespuits](https://github.com/mdespuits)
- [@pixelbandito](https://github.com/pixelbandito)

## Customizing the theme with a custom build

There are a few different styling paradigms at work in RoverUI.
Currently, the best way to customize appearance is by forking the project and making a custom build.

1. Fork the `rover-ui` repository
2. Edit files
3. Run `yarn build` from the project root
4. Publish your fork
5. Point your front-end consumer app at the fork

Now, you can edit CSS-in-JS and/or the CSS custom properties that are imported for use in CSS modules.

## CSS-in-JS

> **DEPRECATED**: We are currently in the process of removing CSS-in-JS and will be completely removed prior to v3.x.

RoverUI uses [styled-components](https://www.npmjs.com/package/styled-components) and [styled-system](https://www.npmjs.com/package/styled-system) on _some_ components.
Any component that's currently wrapped in the `withDefaultTheme` HOC should be using theme properties.

To customize CSS-in-JS themes, edit `src/shared/theme.js` and the files it imports.

### Customize the CSS module theme with a custom build

RoverUI uses CSS modules with [css-loader](https://www.npmjs.com/package/css-loader) on _some_ components.

To customize the CSS modules theme, edit `src/shared/**/*.css`

## License

MIT © [mdespuits](https://github.com/mdespuits)
