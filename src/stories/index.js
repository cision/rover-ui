import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, number } from '@storybook/addon-knobs';

import { Welcome } from '@storybook/react/demo';
import {
  Button,
  BarStat,
} from '../../src';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

const BarStatStories = storiesOf('BarStat', module);

BarStatStories.addDecorator(withKnobs);
BarStatStories.add('with percent', () => <BarStat percent={number('bar percentage', 45)} />);
