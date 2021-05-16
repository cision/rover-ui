import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { Wrap } from '../../../stories/storybook-helpers';
import Dropdown from '../Dropdown';
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
      <Wrap style={{ backgroundColor: '#efefef' }}>
        <Dropdown>
          This is a `Dropdown` wrapper. `Dropdown.Menu` should always be placed
          inside a `Dropdown`.
          <Menu
            isOpen={boolean('isOpen', true)}
            position={select(
              'position',
              ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'],
              'bottomRight'
            )}
            style={{
              minWidth: text('style.minWidth', '300px'),
              width: text('style.width', '300px'),
            }}
          >
            {text('children', 'Your text here')}
          </Menu>
        </Dropdown>
      </Wrap>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
