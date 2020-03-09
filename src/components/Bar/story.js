import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { fontFamily, fontSize, margin, space } from 'styled-system';

import Bar from './';
import Paper from '../Paper';
import BarStatReadme from './README.md';
import withDefaultTheme from '../withDefaultTheme';
import theme from '../../shared/theme';

const Label = withDefaultTheme(styled.span(fontFamily, fontSize));
Label.displayName = 'Label';
Label.defaultProps = {
  fontFamily: 'body',
  fontSize: 1,
};

const Wrap = withDefaultTheme(styled.div(margin));
Wrap.defaultProps = { m: 'md' };
Wrap.displayName = 'Wrap';

const Spacer = withDefaultTheme(styled.div(space));
Spacer.defaultProps = { mb: 'md' };
Spacer.displayName = 'Spacer';

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
    const rounded = boolean('Rounded', true);
    const background = select(
      'Background',
      colorOptions,
      theme.colors.porcelain
    );
    const fill = select('Fill', colorOptions, theme.colors.blue);

    return (
      <Paper mx="lg">
        <Bar rounded={rounded} fill={background}>
          <Bar.Fill fill={fill} width={`${value}%`} />
        </Bar>
        <Label>Percent: {value}</Label>
      </Paper>
    );
  })
  .add('Examples', () => (
    <Wrap>
      <Paper>
        <h3>Default Bar</h3>
        <Bar>
          <Bar.Fill width="73%" />
        </Bar>
      </Paper>

      <Spacer />

      <Paper>
        <h3>Custom Wrapper and Fill</h3>
        <Bar>
          <Bar.Fill fill="salmon" width="50%" />
        </Bar>
      </Paper>

      <Spacer />

      <Paper>
        <h3>Custom Height</h3>
        <Bar style={{ height: '25px' }}>
          <Bar.Fill fill="rebeccapurple" width="83%" />
        </Bar>
      </Paper>

      <Spacer />
      <Paper>
        <h3>Wrapper Width</h3>
        <Bar width="25%">
          <Bar.Fill fill="salmon" width="50%" />
        </Bar>
        <Spacer />
        <Bar width="50%">
          <Bar.Fill fill="green" width="50%" />
        </Bar>
        <Spacer />
        <Bar width="75%">
          <Bar.Fill fill="orange" width="50%" />
        </Bar>
        <Spacer />
        <Bar width="100%">
          <Bar.Fill fill="teal" width="50%" />
        </Bar>
      </Paper>

      <Spacer />

      <Paper>
        <h3>Bars with multiple colors</h3>
        <Bar width="100%">
          <Bar.Fill fill="green" width="25%" />
          <Bar.Fill fill="rebeccapurple" width="10%" />
          <Bar.Fill fill="orange" width="10%" />
        </Bar>
      </Paper>

      <Spacer />

      <Paper>
        <h3>At various fill widths...</h3>
        {[0, 10, 20, 50, 99, 100].map(percent => (
          <div key={`${percent}`.toString()}>
            <Spacer />
            <Bar width="100%">
              <Bar.Fill fill="#3398db" width={`${percent || 0}%`} />
            </Bar>
            <Label>Percent: {percent || 0}%</Label>
          </div>
        ))}
      </Paper>
    </Wrap>
  ));
