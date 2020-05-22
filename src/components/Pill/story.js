import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Icon from '../Icon';
import Pill from '.';
import Readme from './README.md';

storiesOf('Star Systems/Pill', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Pill
        checked={boolean('checked', false)}
        className={text('className', '')}
        onClick={action('onClick')}
      >
        Pill 1
      </Pill>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Examples',
    () => (
      <>
        <Pill
          id="pill-1"
          onClick={() => action('onClick')('pill-1')}
          checked
          style={{ margin: '0 5px 5px 0' }}
        >
          Click to fire callback with id argument
        </Pill>
        <Pill
          id="pill-2"
          onClick={action('onClick')}
          checked
          style={{ margin: '0 5px 5px 0' }}
        >
          Checked, with Pill.Addon (text)
          <Pill.Addon
            onClick={(e) => {
              e.stopPropagation();
              action('onClickEdit')(e);
            }}
          >
            Edit
          </Pill.Addon>
        </Pill>
        <Pill
          id="pill-3"
          onClick={action('onClick')}
          style={{ margin: '0 5px 5px 0' }}
        >
          With Pill.Addon (icon)
          <Pill.Addon
            onClick={(e) => {
              e.stopPropagation();
              action('onClickClear')(e);
            }}
          >
            <Icon name="clear" />
          </Pill.Addon>
        </Pill>
      </>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
