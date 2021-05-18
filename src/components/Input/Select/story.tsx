import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from '.';
import Readme from './README.md';

storiesOf('Planets/Input/Select', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Select>
        Hi! I&apos;m a child of your new `&lt;Select&gt;` component.
      </Select>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
