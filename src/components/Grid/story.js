import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';

// This component's dependencies
import Grid from './';
import Readme from './README.md';

storiesOf('Dark Matter/Grid', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Sandbox',
    () => (
      <Grid gutter={text('gutter', '20px')} columns={number('columns', 3)}>
        <span
          colSpan={number('colSpan (entry 1)', 1)}
          offset={number('offset (entry 1)', 0)}
          style={{ background: 'white' }}
        >
          Sam
        </span>
        <span
          style={{ background: 'white' }}
          clear={boolean('clear (entry 2)', false)}
        >
          Pat
        </span>
        <span style={{ background: 'white' }}>Taylor</span>
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
        <h4>With margins from themes</h4>
        <Grid m="xl" gutter="xl" columns={2}>
          <span style={{ background: 'white' }}>
            This grid has an outer margin and gutter of &quot;2xl&quot;, which
            is defined by the theme.
          </span>
          <span style={{ background: 'white' }}>&nbsp;</span>
        </Grid>
      </section>
      <section>
        <h4>With colSpan</h4>
        <Grid gutter="xl" columns={3}>
          <span colSpan="1" style={{ background: 'white' }}>
            This entry has colSpan=&quot;1&quot;
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
