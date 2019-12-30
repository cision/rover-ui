import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Icon, { iconsMap } from './';
import IconReadme from './README.md';
import style from './style.css';

const iconNames = Object.keys(iconsMap);

storiesOf('Planets/Icon', module)
  .addParameters({
    readme: {
      sidebar: IconReadme,
    },
  })
  .add('Overview', () => (
    <Icon name={select('name', iconNames, 'times-circle')} />
  ))
  .add('Examples', () => (
    <dl className={style.Iconorder}>
      {iconNames.map(iconName => (
        <div key={iconName} className={style.icons}>
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
