import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';

// Rover UI dependencies
import Container from '../Container';

// This component's dependencies
import Readme from './README.md';
import Grid from './';

storiesOf('Dark Matter/Responsive/Grid', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => (
    <Container>
      <Grid
        breakpoints={object('Grid breakpoints', {
          'container-xs-only': {
            columns: 1,
            gutter: '20px',
          },
          'container-sm-only': {
            columns: 2,
            gutter: '20px',
          },
        })}
      >
        <span
          breakpoints={object('First entry breakpoints', {
            'container-sm-only': {
              colSpan: 2,
              offset: 0,
            },
          })}
          style={{ background: 'white' }}
        >
          Entry 1
        </span>
        <span style={{ background: 'white' }}>Entry 2</span>
        <span style={{ background: 'white' }}>Entry 3</span>
      </Grid>
    </Container>
  ))
  .add('Examples', () => (
    <Container>
      <section>
        <h4>2 columns at &quot;sm&quot; and up</h4>
        <Grid
          breakpoints={{
            'container-xs-down': {
              columns: 1,
              gutter: '20px',
            },
            'container-sm-up': {
              columns: 2,
              gutter: '20px',
            },
          }}
        >
          <span
            breakpoints={{
              'container-sm-up': {
                colSpan: 2,
              },
            }}
            style={{ background: 'white' }}
          >
            Spans 2 columns at &quot;sm&quot; and up
          </span>
          <span style={{ background: 'white' }}>No breakpoints</span>
          <span
            breakpoints={{
              'container-md-up': {
                clear: true,
              },
            }}
            style={{ background: 'white' }}
          >
            Clears at &quot;md&quot; and up
          </span>
        </Grid>
      </section>
    </Container>
  ));
