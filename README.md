# RoverUI

> UI Component Library used at Cision

[![NPM](https://img.shields.io/npm/v/@cision/rover-ui.svg)](https://www.npmjs.com/package/@cision/rover-ui)

RoverUI is a collection of UI components originally built for and by Cision. These components should help the Cision team build applications that look hot, in React, quickly.

## Install

```bash
# yarn
yarn add rover-ui
```

```bash
# npm
npm install --save rover-ui
```

For more instructions on installing and using the RoverUI package in your app, see the [docs in Storybook](./src/stories/ROVER_UI.md)

To install and develop or run locally, you're in the right place.

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

## Contributing

### What to avoid in RoverUI

It's _not_ a repository for all shared components. Don't try to add components that deal specifically with business logic and concepts here. Don't try to add components that handle whole layout areas.

## Run locally

1. Read the [Code Guidelines](./CODE_GUIDELINES.md)
2. Download the repository
3. From the root, run `yarn` to install dependencies.
4. Run `yarn storybook` to start a local copy of the docs with living examples you can develop against
5. Add components using the provided templates (see "Creating a new component" below) or modify components
6. Add or modify tests, stories, READMEs and styles in the relevant places in your component's folder.
7. Add your component to `example/src/App.js`
8. When everything looks good in storybook, run `yarn build` from the root to build the `dist` folder.
9. From the `example/` directory, run `yarn start`.
10. That should open a new tab in your browser with an example page that imports the compiled components.
11. Bump the `package.json`'s version _using [semver](https://semver.org/)_. We're currently in alpha, and probably will be for a while. Versions are cheap.
12. If all tests look good, submit a pull-request against the master branch through Github. We're using the master branch for now, but by the time we're out of alpha, we'll have a dev branch.
13. Once you have at least one PR approval from a champion and no pending requests for changes, you can merge in to master.
14. After merging to master, from your local machine, run `yarn publish` in the root. You'll be prompted for the publish version, which should match the package version.
15. After publishing, git tag the commit with a `"v"` prefix, e.g. package version `"0.1.0-alpha.8"` becomes `"v0.1.0-alpha.8"`.
16. Push your tag to the repo

## Reporting issues

Report issues at the [Github issue tracker](https://github.com/cision/rover-ui/issues).

## Champions

The main RoverUI champions currently are:

- Chelsea Shaw
- Chris Garcia
- Matthew Wells

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
      inject: src/stories/index.js
       added: src/components/Dropdown/test.js
```

At any time you can see what generators we have configured using `hygen help`.

### Customizing the theme with a custom build

There are a few different styling paradigms at work in RoverUI.
Currently, the best way to customize appearance is by forking the project and making a custom build.

1. Fork the `rover-ui` repository
2. Edit files
3. Run `yarn build` from the project root
4. Publish your fork
5. Point your front-end consumer app at the fork

Now, you can edit CSS-in-JS and/or the CSS custom properties that are imported for use in CSS modules.

##### CSS-in-JS

RoverUI uses [styled-components](https://www.npmjs.com/package/styled-components) and [styled-system](https://www.npmjs.com/package/styled-system) on _some_ components.
Any component that's currently wrapped in the `withDefaultTheme` HOC should be using theme properties.

To customize CSS-in-JS themes, edit `src/shared/theme.js` and the files it imports.

##### Customize the CSS module theme with a custom build

RoverUI uses CSS modules with [css-loader](https://www.npmjs.com/package/css-loader) on _some_ components.

To customize the CSS modules theme, edit `src/shared/**/*.css`

## License

MIT © [mdespuits](https://github.com/mdespuits)
