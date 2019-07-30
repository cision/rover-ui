---
to: src/components/<%= h.changeCase.pascal(name) %>/story.js
unless_exists: true
---
import React from 'react';
import { storiesOf } from '@storybook/react';

import <%= h.changeCase.pascal(name) %> from './';
import Readme from './README.md';

storiesOf('Uncategorized/<%= h.changeCase.pascal(name) %>', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <<%= h.changeCase.pascal(name) %>>
        Hi! I&apos;m a child of your new `&lt;<%= h.changeCase.pascal(name) %>&gt;` component.
      </<%= h.changeCase.pascal(name) %>>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
