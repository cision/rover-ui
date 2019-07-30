import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Icon, { iconsMap } from './';
import IconReadme from './README.md';

const iconNames = Object.keys(iconsMap);

storiesOf('Planets/Icon', module)
  .addParameters({
    readme: {
      sidebar: IconReadme,
    },
  })
  .add('Overview', () => <Icon name={select('name', iconNames, 'clear')} />)
  .add('Examples', () => (
    <dl>
      {iconNames.map(iconName => (
        <div key={iconName}>
          <dt>{iconName}</dt>
          <dd
            key={iconName}
            style={{
              listStyleType: 'none',
            }}
          >
            <Icon name={iconName} />
          </dd>
        </div>
      ))}
    </dl>
  ));
