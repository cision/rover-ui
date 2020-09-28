import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, object } from '@storybook/addon-knobs';

import EasyPill from './';
import Readme from './README.md';

storiesOf('Galaxies/EasyPill', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const withActions = boolean('with `actions`', true);

      const actions = object('actions', [
        {
          label: 'Boom',
          onClick: action('Boom'),
        },
        {
          label: 'Bang',
          onClick: action('Bang'),
        },
      ]);

      return (
        <EasyPill
          actions={withActions ? actions : []}
          checked={boolean('checked', false)}
          onClick={action('onClick')}
          onDelete={
            boolean('with `onDelete`', true) ? action('onDelete') : null
          }
        >
          EasyPill 1
        </EasyPill>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Examples',
    () => {
      const CheckablePill = props => {
        const [isChecked, setIsChecked] = useState(false);

        return (
          <EasyPill
            {...props}
            checked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
          >
            {props.children}
          </EasyPill>
        );
      };

      return (
        <div style={{ marginBottom: '20px' }}>
          <CheckablePill
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
            onDelete={action('onDelete')}
          >
            With actions and onDelete
          </CheckablePill>
          <br />
          <br />
          <CheckablePill
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
          >
            With actions but no onDelete
          </CheckablePill>
          <br />
          <br />
          <CheckablePill onDelete={action('onDelete')}>
            With onDelete but no actions
          </CheckablePill>
          <br />
          <br />
          <CheckablePill>With neither onDelete nor actions</CheckablePill>
        </div>
      );
    },
    {
      info: {
        inline: true,
        source: false,
        text: Readme,
      },
    }
  );
