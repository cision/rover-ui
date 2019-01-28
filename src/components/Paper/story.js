import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { margin } from 'styled-system';

import Paper from './';
import PaperReadme from './README.md';

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

          <Paper mb={3} p={0}>
            {SampleText}
          </Paper>
          <Paper mb={3} p={1}>
            {SampleText}
          </Paper>
          <Paper mb={3} p={2}>
            {SampleText}
          </Paper>
          <Paper mb={3} p={3}>
            {SampleText}
          </Paper>
          <Paper mb={3} p={4}>
            {SampleText}
          </Paper>
          <Paper mb={3} p={5}>
            {SampleText}
          </Paper>
        </Wrap>
        <Wrap>
          <h3>Complex Nesting</h3>
          <Paper padding={3} bg="gray" color="white">
            <Paper borderRadius={0} p={6}>
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
