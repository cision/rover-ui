import React from 'react';
import { storiesOf } from '@storybook/react';

import Loader from './Loader';
import Readme from './README.md';

import { Wrap } from '../../stories/storybook-helpers';

const FlexWrapper = (props) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: '100px',
      marginBottom: '100px',
    }}
    {...props}
  />
);

storiesOf('Planets/Loader', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => (
    <FlexWrapper>
      <Loader size="md" />
      <Loader style={{ marginTop: '100px' }} />
    </FlexWrapper>
  ))
  .add(
    'Examples',
    () => (
      <>
        <Wrap>
          <Loader size="sm" />
        </Wrap>
        <Wrap>
          <Loader size="md" />
        </Wrap>
        <Wrap>
          <Loader size="lg" />
        </Wrap>
        <Wrap>
          <Loader size="xl" />
        </Wrap>
        <Wrap>
          <Loader style={{ marginLeft: '0' }} />
        </Wrap>
        <Wrap>
          <Loader style={{ marginRight: '0' }} />
        </Wrap>
        <Wrap>
          <div style={{ width: '50%' }}>
            <Loader size="lg" />
          </div>
        </Wrap>
        <Wrap>
          <Loader style={{ marginTop: '75px', marginBottom: '75px' }} />
        </Wrap>
      </>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
