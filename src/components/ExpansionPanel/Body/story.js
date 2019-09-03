import React from 'react';
import { storiesOf } from '@storybook/react';

import Body from './';
import Readme from './README.md';

storiesOf('Galaxies/ExpansionPanel/Body', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => <Body>Body</Body>, {
    info: {
      inline: true,
      source: true,
    },
  })
  .add(
    'Examples',
    () => (
      <div style={{ width: '250px' }}>
        <Body
          style={{
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
          }}
        >
          Body content
        </Body>
      </div>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
