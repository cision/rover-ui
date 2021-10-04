import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Toggle from './Toggle';
import Readme from './README.md';

import { Wrap } from '../../../stories/storybook-helpers';

storiesOf('Planets/Input/Toggle', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Wrap>
        <Toggle
          fauxDisabled={boolean('disabled', false)}
          checked={boolean('toggled', false)}
          onClick={action('onClick (HTML)')}
        />
      </Wrap>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  )
  .add(
    'Examples',
    () => (
      <>
        <Wrap>
          <Toggle />
        </Wrap>
        <Wrap>
          <Toggle checked />
        </Wrap>
        <Wrap>
          <Toggle fauxDisabled />
        </Wrap>
        <Wrap>
          <Toggle checked fauxDisabled />
        </Wrap>
      </>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
