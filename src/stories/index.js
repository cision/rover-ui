import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { number } from '@storybook/addon-knobs';

import { Welcome } from '@storybook/react/demo';
import {
  BarStat,
  Badge,
  Button,
  Paper,
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

BarStatStories.add('with percent', () => <BarStat percent={number('bar percentage', 45)} />);

storiesOf('Badge', module)
  .add('with some emoji', () => {
    const divStyle = {
      marginBottom: '10px',
    };

    return (
      <React.Fragment>
        <Paper style={divStyle}>
          <Badge modifiers={['dark', 'right']}>Cool</Badge>
        </Paper>
        <Paper dark>
          <Badge modifiers={['dark', 'right']}>New</Badge>
        </Paper>
        <Paper style={divStyle}>
          <Badge modifiers={['danger', 'right']}>Ouch</Badge>
        </Paper>
        <Paper style={divStyle}>
          <Badge modifiers={['notify', 'right']}>Cool</Badge>
        </Paper>
        <Paper style={divStyle}>
          <Badge modifiers={['info', 'left']}>Look!</Badge>
        </Paper>
        <Paper style={divStyle}>
          <Badge modifiers={['warning', 'right']}>Uh-oh</Badge>
        </Paper>
        <Paper style={divStyle}>
          <Badge modifiers={['success', 'left']}>Hooray!</Badge>
        </Paper>
      </React.Fragment>);
  });
