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
npm i @cision/rover-ui
```

For more instructions on installing and using the RoverUI package in your app, see the [docs in Storybook](https://cision.github.io/rover-ui)

To install and develop or run locally, you're in the right place.

## Usage

```js
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

If your front-end stack supports a CSS loader, you can add styles with `import`.

```js
import '@cision/rover-ui/dist/rover-ui.css';
```

Otherwise, you'll want to put the rover-ui.css stylesheet in your static resources and load it with an plain old `link`.

```html
<link href="%PUBLIC_URL%/rover-ui.css" rel="stylesheet" />
```

## Contributing

See our [Contribution guidelines](./CONTRIBUTING.md) for more information.

## Reporting issues

Internal reports should be created on Cision Jira (more details to come)

Public issues can be reported at the [GitHub issue tracker](https://github.com/cision/rover-ui/issues).
