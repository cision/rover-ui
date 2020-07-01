import React from 'react';
import { storiesOf } from '@storybook/react';
import { array } from '@storybook/addon-knobs';

// Rover UI dependencies
import Container from '../Container';

// This component's dependencies
import Readme from './README.md';
import Visible from '.';

storiesOf('Dark Matter/Responsive/Visible', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => (
    <div>
      <Container readOnly className="resize">
        <div>
          <Visible
            breakpoints={array('breakpoints', [
              'container-xs-only',
              'container-md-only',
            ])}
          >
            I&apos;ll appear at certain sizes
          </Visible>
        </div>
      </Container>
    </div>
  ));
