import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Responsive from '../Responsive';
import Paper from '../Paper';

import Icon, { iconsMap } from './';
import IconReadme from './README.md';

const iconNames = Object.keys(iconsMap);

storiesOf('Planets/Icon', module)
  .addParameters({
    readme: {
      sidebar: IconReadme,
    },
  })
  .add('Overview', () => (
    <Icon name={select('name', iconNames, iconNames[0])} />
  ))
  .add('Examples', () => (
    <Responsive.Container>
      <dl>
        <Responsive.Grid
          breakpoints={{
            'container-xs-down': {
              columns: 1,
              gutter: '20px',
            },
            'container-sm-up': {
              columns: 2,
              gutter: '20px',
            },
            'container-md-up': {
              columns: 4,
              gutter: '20px',
            },
            'container-lg-up': {
              columns: 6,
              gutter: '20px',
            },
          }}
        >
          {iconNames.map(iconName => (
            <Paper key={iconName}>
              <dd
                key={iconName}
                style={{
                  listStyleType: 'none',
                }}
              >
                <Icon name={iconName} />
              </dd>
              <dt>
                <pre>{iconName}</pre>
              </dt>
            </Paper>
          ))}
        </Responsive.Grid>
      </dl>
    </Responsive.Container>
  ));
