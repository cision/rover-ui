import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { margin } from 'styled-system';
import { boolean, text, object, color } from '@storybook/addon-knobs';

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

const DefaultPaperStyle = {
  style: {
    marginBottom: '10px',
  },
};

storiesOf('Planets/Paper', module)
  .addParameters({
    readme: {
      sidebar: PaperReadme,
    },
  })
  .add(
    'Overview',
    () => {
      const paperText = text(
        'Content',
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
      );

      const isFlat = boolean('Flat', false);
      const isSquared = boolean('Squared', false);
      const background = color('Background', 'var(--rvr-white)');
      const textColor = color('Color', 'var(--rvr-gray)');
      const stylesValue = object('Styles', { ...DefaultPaperStyle.style });
      const styles = {
        ...stylesValue,
        color: textColor,
        backgroundColor: background,
      };

      return (
        <div>
          <Wrap m="lg">
            <Paper squared={isSquared} flat={isFlat} style={styles}>
              {paperText}
            </Paper>
          </Wrap>
        </div>
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
    () => (
      <div>
        <Wrap>
          <h2>Padding Examples</h2>
          <Paper {...DefaultPaperStyle}>{SampleText}</Paper>
        </Wrap>
        <Wrap>
          <h3>Complex Nesting</h3>
          <Paper {...DefaultPaperStyle}>
            <Paper
              {...DefaultPaperStyle}
              style={{
                ...DefaultPaperStyle.style,
                padding: '32px',
              }}
            >
              {SampleText}
            </Paper>
            <Paper
              {...DefaultPaperStyle}
              flat
              squared
              style={{
                ...DefaultPaperStyle.style,
                backgroundColor: 'var(--rvr-green)',
                color: 'var(--rvr-white)',
              }}
            >
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
