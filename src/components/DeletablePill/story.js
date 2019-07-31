import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import DeletablePill from './';
import Readme from './README.md';

storiesOf('Star Systems/DeletablePill', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <DeletablePill
        checked={boolean('checked', false)}
        onClick={action('onClick')}
        onDelete={action('onDelete')}
      >
        DeletablePill 1
      </DeletablePill>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
