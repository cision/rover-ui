import React from 'react';
import { storiesOf } from '@storybook/react';

import Pill from './';
import Readme from './README.md';

function handleClick(id) {
  alert(`clicked ${id}`);
}
storiesOf('Star System/Pill', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Pill id="pill-1" onClick={handleClick} selected>
        Pill 1
      </Pill>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Pills list',
    () => (
      <React.Fragment>
        <Pill id="pill-1" onClick={handleClick} selected>
          Pill 1
        </Pill>
        <Pill id="pill-2" onClick={handleClick} selected>
          Pill 2
        </Pill>
        <Pill id="pill-3" onClick={handleClick}>
          Pill 3
        </Pill>
      </React.Fragment>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
