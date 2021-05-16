import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Wrap } from '../../stories/storybook-helpers';

import Paper from '../Paper';
import Typography from '.';
import type { Color, Size, Tag, Weight } from './Typography';
import Readme from './README.md';

const tags = ['undefined', 'div', 'span', 'strong', 'textarea', 'Paper'];
const sizes = ['inherit', 'sm', 'md', 'lg', 'xl', 'xl2', 'xl3'];
const weights = ['inherit', 'normal', 'bold'];
const colors = ['inherit', 'primary', 'primary-alt', 'black'];

storiesOf('Planets/Typography', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const tagSelection = select('tag', tags, 'undefined');
      const tag = tagSelection === 'Paper' ? Paper : tagSelection;

      return (
        <Wrap>
          <Typography
            tag={tagSelection === 'undefined' ? undefined : (tag as Tag)}
            size={select('sizes', sizes, 'md') as Size}
            weight={select('weight', weights, 'normal') as Weight}
            color={select('color', colors, 'primary') as Color}
          >
            Hi! I&apos;m a child of &lt;Typography&gt; component.
          </Typography>
        </Wrap>
      );
    },
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
          <Typography tag="h1" size="xl3">
            Text Size xl3 normal
          </Typography>
        </Wrap>
        <Wrap>
          <Typography tag="h2" size="xl2">
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
