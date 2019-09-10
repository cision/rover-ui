import React from 'react';
import { storiesOf } from '@storybook/react';
import { array } from '@storybook/addon-knobs';

// Rover UI dependencies
import Container from '../Container';

// This component's dependencies
import Readme from './README.md';
import Hidden from './';

storiesOf('Dark Matter/Responsive/Hidden', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => (
    <div>
      <Container readOnly style={{ resize: 'both' }}>
        <div>
          <Hidden
            breakpoints={array('breakpoints', [
              'container-xs-only',
              'container-md-only',
            ])}
          >
            I&apos;ll disappear at certain sizes
          </Hidden>
        </div>
      </Container>
    </div>
  ));
