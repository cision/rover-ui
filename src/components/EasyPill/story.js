import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import EasyPill from './';
import Readme from './README.md';

storiesOf('Star Systems/EasyPill', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <EasyPill
        actions={[
          {
            label: 'Boom',
            onClick: action('Boom'),
          },
          {
            label: 'Bang',
            onClick: action('Bang'),
          },
        ]}
        checked={boolean('checked', false)}
        onDelete={action('onDelete')}
      >
        EasyPill 1
      </EasyPill>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
