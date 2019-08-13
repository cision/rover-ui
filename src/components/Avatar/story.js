import React from 'react';
import { storiesOf } from '@storybook/react';

import Avatar from './';
import Readme from './README.md';

storiesOf('Planets/Avatar', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Avatar>
        Hi! I&apos;m a child of your new `&lt;Avatar&gt;` component.
      </Avatar>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add('Examples', () => (
    <React.Fragment>
      <Avatar name="Rob Heckart" />
      <Avatar
        name="Rob Heckart"
        url="https://pbs.twimg.com/profile_images/872159975375683585/gRuwKA-5_400x400.jpg"
      />
    </React.Fragment>
  ));
