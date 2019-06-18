import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { margin } from 'styled-system';

import Paper from './';
import PaperReadme from './README.md';

const Wrap = styled.div(margin);
Wrap.defaultProps = {
  m: 'md',
};

Wrap.displayName = 'Wrap';

const SampleText = (
  <span>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </span>
);

storiesOf('Planets/Paper', module)
  .addParameters({
    readme: {
      sidebar: PaperReadme,
    },
  })
  .add(
    'Overview',
    () => (
      <div>
        <Wrap>
          <h2>Padding Examples</h2>

          <Paper mb="lg" p={0}>
            {SampleText}
          </Paper>
          <Paper mb="lg" p="xs">
            {SampleText}
          </Paper>
          <Paper mb="lg" p="sm">
            {SampleText}
          </Paper>
          <Paper mb="lg" p="lg">
            {SampleText}
          </Paper>
          <Paper mb="lg" p="2xl">
            {SampleText}
          </Paper>
          <Paper mb="lg" p="3xl">
            {SampleText}
          </Paper>
        </Wrap>
        <Wrap>
          <h3>Complex Nesting</h3>
          <Paper p="lg" bg="gray" color="white">
            <Paper borderRadius={0} p="4xl">
              {SampleText}
            </Paper>
            <Paper borderRadius={0} bg="green" color="white">
              {SampleText}
            </Paper>
          </Paper>
        </Wrap>
      </div>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
