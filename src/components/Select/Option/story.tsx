import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';

import { Wrap } from '../../../stories/storybook-helpers';

import Option from '.';
import Readme from './README.md';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FancySpan = (props: Record<string, any>) => <strong {...props} />;

storiesOf('Planets/Select/Option', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const name = text('children', 'Option 1');

      return (
        <Wrap>
          <Option
            disabled={boolean('disabled', false)}
            value={text('value', 'custom value')}
          >
            {name}
          </Option>
        </Wrap>
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
      const now = new Date();

      return (
        <Wrap>
          <Option value={now.toISOString()}>
            Now (time) with an ISO string value
          </Option>
          <Option>Just plain old text</Option>
          <Option value="no-tags-here">
            Don&apos;t put <strong>HTML</strong> or
            <FancySpan>React components</FancySpan> in your option unless you
            specify a value.
          </Option>
          <Option disabled>Disabled</Option>
        </Wrap>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
