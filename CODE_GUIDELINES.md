# Code Guidelines

## Best practices

### Business-agnostic

This is an agnostic UI library, and shouldn't have business-specific logic built in. That means there should be no references to objects unique to your business by name, e.g. survey, article, blog, contact, story, campaign.

Instead, write components with generic objects in mind, like people, media, actions, etc.

## Organization

Component js, styles, tests, and stories should be siblings. If they're in their own directory, provide an `index.js` file.

```
Modal/
|-- index.js   # Core component file, imports module.css
|-- module.css  # Styles, as CSS modules
|-- tests.js    # Used with an npm command
`-- stories.js  # Used by storybook, separate npm command
```

### Sub-components

Components may have sub-components. For instance, a modal comes with a header, body, and footer.
In that case, the sub-components should _only_ be imported by the parent component.
Expose the components with `.` notation, as `Modal.Header`, etc.

Sub-components have the same structure/naming conventions as top-level components, but they live in nested folders under the parents.

```
Modal/
|-- index.js
|-- module.css
|-- tests.js
|-- stories.js
`-- Header/
    |-- index.js
    |-- module.css
    |-- tests.js
    `-- stories.js
```

Generally, if a component has sub-components, you shouldn't render anything else at the component's top-level. Also, those sub-components should not be rendered anywhere outside of the parent.

```
// Bad
return (
  <Modal>
    <Modal.Header>
      Title
    </Modal.Header>
    This text should be wrapped in a sub-component.
  </Modal>
);

return (
  <Modal.Header>
    This header shouldn't be outside a Modal.
  </Modal.Header>
);

// Good
return (
  <Modal>
    <Modal.Header>
      Title
    </Modal.Header>
    <Modal.Footer>
      ...buttons, maybe?
    </Modal.Footer>
  </Modal>
);
```

### Unit tests

Every exported component should have a test file.

> TODO: Every exported component should have a UI test that saves a render of the component.

### Documentation

Every exported component should have:

1. Example and component pages in Storybook.
2. Descriptive, exported propTypes and defaultProps
3. JSDoc comments for propTypes and component purposes.

### State

These UI components should be light and frequently stateless.

Sometimes, there's good reason to include local state, e.g. to handle clearing an input or to add focus/hover states. In those cases, we should provide a controlled (stateless) version of the component, in addition to an uncontrolled (stateful) version that wraps it. Prefix uncontrolled component names with **Uncontrolled**

## Linters

We run linters pre-commit to enforce code conventions. It is useful to have your editor automatically fix issues before you attempt to commit. Here are direct links to help you setup each of these linters for your preferred editor.

- [ESLint](https://eslint.org/) to lint JS
- Configuration: [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) (modified)
- [Editor integrations](https://eslint.org/docs/user-guide/integrations#editors)

* [stylelint](https://github.com/stylelint/stylelint) to lint stylesheets
* Configuration: [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
* [Editor integrations](https://stylelint.io/user-guide/complementary-tools/#editor-plugins)

- [Prettier](https://prettier.io/) to format stylesheets
- [Editor integrations](https://prettier.io/docs/en/editors.html)

## Pull requests

All code changes should be in branches and should be reviewed and approved by at least 2 people. One of those people should be a RoverUI V2 champion.

Currently, the champions are:

- [@mdespuits](https://github.com/mdespuits)
- [@chelshaw](https://github.com/chelshaw)
- [@pixelbandito](https://github.com/pixelbandito)
