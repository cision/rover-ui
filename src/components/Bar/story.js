import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select } from '@storybook/addon-knobs';
import { Wrap, Label, Spacer, Title } from '../../stories/storybook-helpers';

import Bar from './Bar';
import BarStatReadme from './README.md';
import theme from '../../shared/theme';

const colorOptions = {
  'river-bed': theme.colors['river-bed'],
  'shuttle-gray': theme.colors['shuttle-gray'],
  blue: theme.colors.blue,
  gray: theme.colors.gray,
  green: theme.colors.green,
  porcelain: theme.colors.porcelain,
  salmon: theme.colors.salmon,
  teal: theme.colors.teal,
  white: theme.colors.white,
  transparent: 'transparent',
};

const options = {
  range: true,
  min: 0,
  max: 100,
  step: 1,
};

storiesOf('Star Systems/Bar', module)
  .addParameters({
    readme: {
      sidebar: BarStatReadme,
    },
  })
  .add('Overview', () => {
    const value = number('Percent', 25, options);
    const background = select(
      'Background',
      colorOptions,
      theme.colors.porcelain
    );
    const fill = select('Fill', colorOptions, theme.colors.blue);

    return (
      <Wrap>
        <Bar style={{ backgroundColor: background }}>
          <Bar.Fill style={{ backgroundColor: fill, width: `${value}%` }} />
        </Bar>
        <Label>Percent: {value}%</Label>
      </Wrap>
    );
  })
  .add('Examples', () => (
    <>
      <Wrap>
        <Title>Default Bar</Title>
        <Bar>
          <Bar.Fill width="73%" />
        </Bar>
      </Wrap>

      <Wrap>
        <Title>Custom Wrapper and Fill</Title>
        <Bar style={{ background: theme.colors.loblolly }}>
          <Bar.Fill width="50%" style={{ background: theme.colors.salmon }} />
        </Bar>
      </Wrap>

      <Wrap>
        <Title>Wrapper Width</Title>
        <Bar width="25%">
          <Bar.Fill width="50%" style={{ background: theme.colors.salmon }} />
        </Bar>
        <Spacer />
        <Bar width="50%">
          <Bar.Fill width="50%" style={{ background: theme.colors.green }} />
        </Bar>
        <Spacer />
        <Bar width="75%">
          <Bar.Fill width="50%" style={{ background: theme.colors.blue }} />
        </Bar>
        <Spacer />
        <Bar>
          <Bar.Fill width="50%" style={{ background: theme.colors.teal }} />
        </Bar>
      </Wrap>

      <Wrap>
        <Title>Bars with multiple colors</Title>
        <Bar>
          <Bar.Fill width="25%" style={{ background: theme.colors.green }} />
          <Bar.Fill
            width="10%"
            style={{ background: theme.colors.brandColor }}
          />
          <Bar.Fill width="10%" style={{ background: theme.colors.loblolly }} />
        </Bar>
      </Wrap>

      <Wrap>
        <Title>At various fill widths...</Title>
        {[0, 10, 20, 50, 99, 100].map(percent => (
          <div key={percent.toString()}>
            <Spacer />
            <Bar style={{ width: '100%' }}>
              <Bar.Fill
                style={{
                  background: theme.colors.green,
                  width: `${percent || 0}%`,
                }}
              />
            </Bar>
            <Label>Percent: {percent || 0}%</Label>
          </div>
        ))}
      </Wrap>
    </>
  ));
