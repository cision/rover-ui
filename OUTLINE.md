# Documentation outline

This outline covers the proposed contents of [README.md](./README.md)

## Introduction

RoverUI is a collection UI components that define TrendKite's design language. These components should help you build applications in React that look and feel right.

## Installation

For installation and usage as a consumer, redirect to Storybook homepage.

To install and develop or run locally, you're in the right place.

## Development

### What to avoid in RoverUI

It's _not_ a repository for all of TrendKite's shared components. Don't try to add components that deal specifically with TrendKite business logic and concepts here. Don't try to add components that handle whole layout areas.

### Creating a new component

We use `hygen` templates to make adding component boilerplate much simpler.

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

## Run locally

## Contributing

- Link to [Code Guidelines](./CODE_GUIDELINES.md)

## Reporting issues

## Owners

List of current champions. Instructions to become a champion.
