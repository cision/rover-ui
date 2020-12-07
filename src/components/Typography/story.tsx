import React from 'react';
import { storiesOf } from '@storybook/react';
import { Wrap } from '../../stories/storybook-helpers';

import Typography from '.';
import Readme from './README.md';

storiesOf('Planets/Typography', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Typography
        tag="div"
        size="xl2"
        align="center"
        weight="bold"
        color="primary-alt"
      >
        Hi! I&apos;m a child of &lt;Typography&gt; component.
      </Typography>
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
          <Typography tag="h1" weight="bold" size="xl3" color="black">
            Text Size xl3 bold
          </Typography>
        </Wrap>
        <Wrap>
          <Typography tag="h1" align="right" size="xl3">
            Text Size xl3 normal
          </Typography>
        </Wrap>
        <Wrap>
          <Typography tag="h2" align="center" size="xl2">
            Text Size xl2
          </Typography>
        </Wrap>
        <Wrap>
          <Typography tag="p" color="black" size="lg">
            Large size (lg) text in a Paragraph tag
          </Typography>
        </Wrap>
        <Wrap>
          <Typography tag="p" color="primary-alt" size="md">
            Medium size (md) text in a Paragraph tag
          </Typography>
        </Wrap>
        <Wrap>
          <Typography tag="p" size="md">
            Small size (sm) text in a Paragraph tag
          </Typography>
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
