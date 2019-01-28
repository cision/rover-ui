# RoverUI

> UI Component Library used at Cision

[![NPM](https://img.shields.io/npm/v/rover-ui.svg)](https://www.npmjs.com/package/rover-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save rover-ui
```

## Usage

```jsx
import React, { Component } from 'react';

import MyComponent from 'rover-ui';

class Example extends Component {
  render() {
    return <MyComponent />;
  }
}
```

## Development

### Creating a new component

We use [`hygen`](http://www.hygen.io/) templates to make adding component boilerplate much simpler.

```sh
# rover-ui
$ yarn hygen component new Dropdown

Loaded templates: _templates
       added: src/components/Dropdown/index.js
      inject: src/index.js
       added: src/components/Dropdown/README.md
       added: src/components/Dropdown/story.js
      inject: src/stories.js
       added: src/components/Dropdown/test.js
```

At any time you can see what generators we have configured using `hygen help`.

## License

MIT © [mdespuits](https://github.com/mdespuits)
