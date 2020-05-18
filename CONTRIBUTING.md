# Contributing to RoverUI

## What to avoid in RoverUI

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

## Creating a new component

We use [`hygen`](http://www.hygen.io/) templates to make adding component boilerplate much simpler.

```sh
$ yarn generate-component Select
$ /Users/mwells/code/github.com/cision/rover-ui/node_modules/.bin/hygen component new Select

Loaded templates: _templates
       added: src/components/Select/Select.module.css
       added: src/components/Select/Select.tsx
      inject: example/src/App.js
      inject: example/src/App.js
       added: src/components/Select/index.ts
      inject: src/index.ts
       added: src/components/Select/README.md
       added: src/components/Select/story.js
      inject: src/stories/index.js
       added: src/components/Select/test.js
✨  Done in 0.77s.
```

At any time you can see what generators we have configured using `hygen help`.

### Testing another project using local RoverUI

For simple projects, you should be able to use [`npm link`](https://docs.npmjs.com/cli/link.html) or [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) to temporarily and invisibly load your local copy of RoverUI as a dependency in another project. These tools both have caveats, though. They may fail on peer dependencies, and their symlinking strategy can introduce bugs in monorepos with multiple workspaces.

### Testing in monorepos with `yalc` (experimental)

You can use [yalc](https://github.com/whitecolor/yalc) to test a local project. It copies files instead of symlinking them.

1. In the RoverUI project directory, use `yalc publish --force`. Using `--force` is important because it skips the publish scripts, so it won't try to connect to npm.
2. In the target project directory, use `yalc add @cision/rover-ui --no-pure`. Using `--no-pure-` is required if you're working in a monorepo with multiple workspaces, but _it will edit your consuming project's `package.json` file and add a `.yalc` folder and `yalc.lock`. **Don't forget to revert those changes when you're finished.**_
3. You should be able to import RoverUI components in your target project normally now.

Please tread carefully, and add any issues or suggestions on the [GitHub issue tracker](https://github.com/cision/rover-ui/issues).

## Publishing a new version

To publish the npm package, you'll need a free account on npmjs.com, and you'll need to be added to the list of maintainers by one of the current RoverUI maintainers.

1. In `package.json`, bump the `version` and `publishConfig.tag` properties _using [semver](https://semver.org/)_. `publishConfig.tag` should start with a "v", but otherwise be identical to `version`.
2. If all tests look good (`yarn test`), submit a pull-request against the master branch through GitHub.
3. Once you have at least one PR approval from a [champion](README.md#champions) and no pending requests for changes, you can merge in to master.
4. After merging to master, from your local machine, run `yarn release` in the root. You'll be prompted for the publish version, which should match the package version.

If you don't have write access to the repo, one of the admins can do steps 3 and 4 for you.

## Publishing Storybook

By default, our Storybook docs are published automatically using ![Github Actions](.github/workflows/gh-pages.yml). If there is an issue with this release or you need to publish this manually, use the following command:

```sh
yarn storybook:deploy
```
