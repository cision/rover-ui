import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Responsive from '../Responsive';

import { BuildHelper } from '../../stories/storybook-helpers';

import Icon, { iconsMap } from '.';
import IconReadme from './README.md';

const Wrap = BuildHelper(
  'IconWrap',
  'm-5 rounded bg-white shadow-md text-sm p-4 flex flex-row flex-nowrap items-center'
);

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
            },
            'container-sm-up': {
              columns: 2,
            },
            'container-lg-up': {
              columns: 4,
            },
          }}
        >
          {iconNames.map((iconName) => (
            <Wrap key={iconName}>
              <dd
                key={iconName}
                style={{
                  marginRight: '15px',
                  listStyleType: 'none',
                }}
              >
                <Icon fill="currentColor" name={iconName} />
              </dd>
              <dt>
                <pre>{iconName}</pre>
              </dt>
            </Wrap>
          ))}
        </Responsive.Grid>
      </dl>
    </Responsive.Container>
  ));
