import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';

import Collapse from './';
import Readme from './README.md';

storiesOf('Star Systems/Collapse', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Collapse
        isOpen={boolean('isOpen', false)}
        timeout={number('timeout', 200)}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Collapse>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
