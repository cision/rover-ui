import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

import Body from '.';
import Readme from './README.md';

storiesOf('Galaxies/ExpansionPanel/Body', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => <Body style={object('style', {})}>Body</Body>, {
    info: {
      inline: true,
      source: true,
    },
  })
  .add(
    'Examples',
    () => (
      <div style={{ width: '250px' }}>
        <Body className="bg-white border p-3 m-3">Body content</Body>
      </div>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
