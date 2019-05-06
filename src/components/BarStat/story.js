import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { margin, space } from 'styled-system';

// import BarStat from './';
import BarStat, * as Bar from './index.js';
import Paper from '../Paper';
import BarStatReadme from './README.md';
import withDefaultTheme from '../withDefaultTheme';

const Wrap = withDefaultTheme(styled.div(margin));
Wrap.defaultProps = { m: 3 };
Wrap.displayName = 'Wrap';

const Spacer = withDefaultTheme(styled.div(space));
Spacer.defaultProps = { mb: 3 };
Spacer.displayName = 'Spacer';

const options = {
  range: true,
  min: 0,
  max: 100,
  step: 1,
};

storiesOf('Solar System/BarStat', module)
  .addParameters({
    readme: {
      sidebar: BarStatReadme,
    },
  })
  .add('Overview', () => {
    const value = number('Percent', 73, options);
    return (
      <Wrap>
        <BarStat percent={value}>
          <Bar.Label>Percent: {value}</Bar.Label>
        </BarStat>
      </Wrap>
    );
  })
  .add('<Bar>', () => (
    <Wrap>
      <Paper mb={2}>
        <h3>Default Bar</h3>
        <Bar.Bar />
      </Paper>

      <Paper mb={2}>
        <h3>Brand Color Bar</h3>
        <Bar.Bar bg="brandColor" />
      </Paper>

      <Paper mb={2}>
        <h3>Bar with custom background and width</h3>
        <Bar.Bar bg="green" width="25%" />
        <Spacer />
        <Bar.Bar bg="green" width="50%" />
      </Paper>

      <Paper mb={2}>
        <h3>Bars can be nested (BarStat uses this)</h3>
        <Bar.Bar width="100%">
          <Bar.Bar bg="green" width="25%" />
          <Bar.Bar bg="brandColor" width="10%" />
        </Bar.Bar>
      </Paper>
    </Wrap>
  ))
  .add(
    'Examples',
    () => (
      <div>
        {[null, 0, 10, 20, 50, 99, 100].map(percent => (
          <Wrap key={`${percent}`.toString()}>
            <BarStat percent={percent}>
              <Bar.Label>Percent: {percent || 0}%</Bar.Label>
            </BarStat>
          </Wrap>
        ))}
      </div>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
