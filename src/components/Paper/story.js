import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { margin } from 'styled-system';

import Paper from './';

const Wrap = styled.div(margin);
Wrap.defaultProps = {
  m: 3,
};

Wrap.displayName = 'Wrap';

const SampleText = (
  <span>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </span>
);

storiesOf('Planets/Paper', module).add(
  'Overview',
  () => {
    return (
      <div>
        <Wrap>
          <Paper>{SampleText}</Paper>
        </Wrap>
        <Wrap>
          <Paper p={0}>{SampleText}</Paper>
        </Wrap>
        <Wrap>
          <Paper p={1}>{SampleText}</Paper>
        </Wrap>
        <Wrap>
          <Paper p={2}>{SampleText}</Paper>
        </Wrap>
        <Wrap>
          <Paper p={3}>{SampleText}</Paper>
        </Wrap>
        <Wrap>
          <Paper p={4}>{SampleText}</Paper>
        </Wrap>
        <Wrap>
          <Paper p={5}>{SampleText}</Paper>
        </Wrap>
      </div>
    );
  },
  {
    info: {
      inline: true,
      source: true,
      text: `
        The \`<Paper />\` component can wrap any kind of node.
      `,
    },
  }
);
