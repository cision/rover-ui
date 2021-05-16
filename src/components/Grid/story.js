import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';

// This component's dependencies
import Grid from '.';
import Readme from './README.md';

// Grid formerly supported theming values generically, and gutter theme values
// specifically (prop'ped down to Entry.tsx, through styled-components and our own bespoke style definitions.
//
// Acceptable _gutter_ values are now only numbers and sizing strings, or manually through className.
//
storiesOf('Dark Matter/Grid', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Grid
        className="p-4"
        gutter={text('gutter', '20px')}
        columns={number('columns', 3)}
      >
        <span
          colSpan={number('colSpan (entry 1)', 1)}
          offset={number('offset (entry 1)', 0)}
          className="bg-white shadow rounded p-6"
        >
          Sam
        </span>
        <span
          className="bg-white shadow rounded p-6"
          clear={boolean('clear (entry 2)', false)}
        >
          Pat
        </span>
        <span className="bg-white shadow rounded p-6">Taylor</span>
      </Grid>
    ),
    {
      info: {
        inline: true,
        source: true,
        text: ``,
      },
    }
  )
  .add('Examples', () => (
    <div style={{}}>
      <section>
        <h4>With colSpan</h4>
        <Grid gutter="20px" columns={3}>
          <span colSpan="1" style={{ background: 'white' }}>
            This entry has colSpan=&quot;1&quot; and a gutter of 20px
          </span>
          <span style={{ background: 'white' }}>This entry has no colspan</span>
          <span style={{ background: 'white' }}>This entry has no colspan</span>
          <span colSpan={2} style={{ background: 'white' }}>
            This entry has colspan={'{2}'};
          </span>
          <span clear style={{ background: 'white' }}>
            This entry has clear
          </span>
          <span colSpan={3} style={{ background: 'white' }}>
            This entry has colspan={'{3}'}
          </span>
        </Grid>
      </section>
    </div>
  ));
