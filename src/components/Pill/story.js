import React from 'react';
import { storiesOf } from '@storybook/react';

import Pill from './';
import Readme from './README.md';

function handleClick(id) {
  alert(`clicked ${id}`);
}
storiesOf('Uncategorized/Pill', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <React.Fragment>
        <Pill id="pill-1" onClick={handleClick}>
          Pill 1
        </Pill>
        <Pill selected id="pill-2" onClick={handleClick}>
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
