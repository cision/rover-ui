import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, object, color } from '@storybook/addon-knobs';

import Paper from './';
import PaperReadme from './README.md';

import { BuildHelper } from '../../stories/storybook-helpers';

const Section = BuildHelper('Section', 'm-5 mb-0');

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
      const textColor = color('Color', 'var(--rvr-color-font)');
      const stylesValue = object('Styles', { ...DefaultPaperStyle.style });
      const styles = {
        ...stylesValue,
        color: textColor,
        backgroundColor: background,
      };

      return (
        <div className="pb-5">
          <Section>
            <Paper squared={isSquared} flat={isFlat} style={styles}>
              {paperText}
            </Paper>
          </Section>
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
      <div className="pb-5">
        <Section>
          <h2 className="text-2xl">Padding Examples</h2>
          <Paper {...DefaultPaperStyle}>{SampleText}</Paper>
        </Section>
        <Section>
          <h2 className="text-2xl">Complex Nesting</h2>
          <Paper>
            <Paper
              className="mb-5"
              style={{
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
                backgroundColor: 'var(--rvr-green)',
                color: 'var(--rvr-white)',
              }}
            >
              {SampleText}
            </Paper>
          </Paper>
        </Section>
      </div>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
