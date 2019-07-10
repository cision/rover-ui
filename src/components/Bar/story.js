import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { fontFamily, fontSize, margin, marginTop, space } from 'styled-system';

import { Bar, Fill } from './';
import Paper from '../Paper';
import BarStatReadme from './README.md';
import withDefaultTheme from '../withDefaultTheme';
import theme from '../../shared/theme';

const Heading = withDefaultTheme(styled.h3(marginTop, fontFamily, fontSize));
Heading.displayName = 'Heading';
Heading.defaultProps = {
  marginTop: 0,
  fontFamily: 'body',
  fontSize: 2,
};

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

storiesOf('Star System/Bar', module)
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
      <Paper mx="lg">
        <Bar bg={background}>
          <Fill bg={fill} width={`${value}%`} />
        </Bar>
        <Label>Percent: {value}</Label>
      </Paper>
    );
  })
  .add('Examples', () => (
    <Wrap>
      <Paper mb="sm">
        <Heading>Default Bar</Heading>
        <Bar>
          <Fill width="73%" />
        </Bar>
      </Paper>

      <Paper mb="sm">
        <Heading>Custom Wrapper and Fill</Heading>
        <Bar bg="loblolly">
          <Fill bg="salmon" width="50%" />
        </Bar>
      </Paper>

      <Paper mb="sm">
        <Heading>Wrapper Width</Heading>
        <Bar width="25%">
          <Fill bg="salmon" width="50%" />
        </Bar>
        <Spacer />
        <Bar width="50%">
          <Fill bg="green" width="50%" />
        </Bar>
        <Spacer />
        <Bar width="75%">
          <Fill bg="blue" width="50%" />
        </Bar>
        <Spacer />
        <Bar width="100%">
          <Fill bg="teal" width="50%" />
        </Bar>
      </Paper>

      <Paper mb="sm">
        <Heading>Bars with multiple colors</Heading>
        <Bar width="100%">
          <Fill bg="green" width="25%" />
          <Fill bg="brandColor" width="10%" />
          <Fill bg="loblolly" width="10%" />
        </Bar>
      </Paper>

      <Paper mb="sm">
        <Heading>At various fill widths...</Heading>
        {[0, 10, 20, 50, 99, 100].map(percent => (
          <div key={`${percent}`.toString()}>
            <Spacer />
            <Bar width="100%">
              <Fill bg="green" width={`${percent || 0}%`} />
            </Bar>
            <Label>Percent: {percent || 0}%</Label>
          </div>
        ))}
      </Paper>
    </Wrap>
  ));
