import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';

import Menu from '.';
import Readme from './README.md';

storiesOf('Star Systems/Dropdown/Menu', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <div
        style={{
          position: 'relative',
          margin: '0 auto',
          background: 'gray',
          borderRadius: '20px',
          width: '40px',
          height: '40px',
        }}
      >
        <Menu
          isOpen={boolean('isOpen', true)}
          position={select(
            'position',
            ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'],
            'bottomRight'
          )}
          style={{
            width: text('style.width', '300px'),
          }}
        >
          {text('children', 'Your text here')}
        </Menu>
      </div>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
