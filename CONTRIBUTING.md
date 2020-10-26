# Contributing to RoverUI

## What to avoid in RoverUI

It's _not_ a repository for all shared components. Don't try to add components that deal specifically with business logic and concepts here. Don't try to add components that handle whole layout areas. This is a UI library only.

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

### Component-writing guidelines

- Most components should be ["dumb", a.k.a "presentational"](https://www.digitalocean.com/community/tutorials/react-smart-dumb-components#:~:text=What%20Makes%20a%20Component%20Smart,focus%20solely%20on%20the%20UI.).
- Most components should render smaller components, and keep styling at each level to a minimum.
- Let consumers pass in custom `children` nodes when possible, so they can compose custom experiences.
- Let consumers pass arbitrary extra props that are applied to the outermost rendered DOM element or React component. (This is super helpful for consumer-added styles, custom data attributes, and accessibility props.)
- Sometimes it's developer-friendly to provide some state management, e.g. open/closed panels or valid/invalid inputs. In those cases, export dumb components first, then add a smart component with the prefix "Easy". See [EasyDropdown](https://github.com/cision/rover-ui/blob/master/src/components/EasyDropdown/EasyDropdown.tsx)
- For legibility, we prefer composing Components by passing React nodes as props, rather than other forms of function composition.
- We use TypeScript, but don't add types for props that aren't actively consumed by your code, even if you "know" the types you expect. Overtyping in intermediate layers leads to nothing but 💔.

### Testing another project using local RoverUI

For simple projects, you should be able to use [`npm link`](https://docs.npmjs.com/cli/link.html) or [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) to temporarily and invisibly load your local copy of RoverUI as a dependency in another project. These tools both have caveats, though. They may fail on peer dependencies, and their symlinking strategy can introduce bugs in monorepos with multiple workspaces.

### Testing in monorepos with `yalc` (experimental)

You can use [yalc](https://github.com/whitecolor/yalc) to test a local project. It copies files instead of symlinking them.

1. In the RoverUI project directory, use `yalc publish --force`. Using `--force` is important because it skips the publish scripts, so it won't try to connect to npm.
2. In the target project directory, use `yalc add @cision/rover-ui --no-pure`. Using `--no-pure-` is required if you're working in a monorepo with multiple workspaces, but _it will edit your consuming project's `package.json` file and add a `.yalc` folder and `yalc.lock`. **Don't forget to revert those changes when you're finished.**_
3. You should be able to import RoverUI components in your target project normally now.

Please tread carefully, and add any issues or suggestions on the [GitHub issue tracker](https://github.com/cision/rover-ui/issues).

## Commit messages

- Please use the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) syntax for your commits.
- Include issue numbers in the commit if applicable, e.g. "fix: Update text input border color, resolves #215".
- Write your commit message in plain English so that others can easily understand the commit history at a glance.

## Merging

Don't merge code to `master` without a PR and at least one (preferably two) approvals from admins. Once your code is merged and ready, you're ready to [publish](PUBLISHING.md).
