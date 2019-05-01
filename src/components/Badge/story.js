import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import {
  alignSelf,
  color,
  flex,
  justifyContent,
  order,
  space,
} from 'styled-system';

import theme from '../../shared/theme.js';
import Badge, { variants } from '../Badge';

const Flex = styled.div({ display: 'flex' }, flex, space);

Flex.defaultProps = {
  justifyContent: 'flex-start',
  flex: '1 0 auto',
  p: 3,
  mb: 0,
};

Flex.displayName = 'Flex';

const Box = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  alignSelf,
  justifyContent,
  flex,
  order,
  color,
  space
);

Box.displayName = 'Box';

Box.defaultProps = {
  alignSelf: 'flex-start',
  justifyContent: 'center',
  p: 3,
  mb: 2,
};

storiesOf('Planets/Badge', module)
  .add(
    'Overview',
    () => {
      const colorOptions = variants;

      const fontSize = select('Font size', theme.fontSizes.map((_, i) => i), 2);
      const variant = select('Variant', colorOptions, '');

      return (
        <Box p={4}>
          <Badge fontSize={fontSize} variant={variant}>
            {text('Children', 'My Badge')}
          </Badge>
        </Box>
      );
    },
    {
      info: {
        inline: true,
        text: `
#### Badges are used for additional information

              The badge background color is controled by the \`color\` prop.
              Any of the semantic colors can be overridden by \`darkMode = true\`.
              Color is optional, will default to very light gray background.

              **Valid Colors:**
              * dark
              * light
              * danger
              * notify
              * warning
              * info
              * success


              If you are trying to have spacing around or between badges lined up next to each other, it must be controlled by a parent div like so:

              ~~~js
              const badgeWrapStyle = { marginRight: '10px' };

              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <div style={badgeWrapStyle}>
                  <Badge color="info">Print</Badge>
                </div>
                <div style={badgeWrapStyle}>
                  <Badge color="info">Broadcast</Badge>
                </div>
                <div style={badgeWrapStyle}>
                  <Badge color="info">Radio</Badge>
                </div>
              </div>
              ~~~
            `,
      },
    }
  )
  .add('Examples', () => (
    <Box p={1}>
      <Box>
        <Badge>My Badge</Badge>
        <Badge ml={2} bg="grayLite.3" color="gray">
          Other
        </Badge>
      </Box>
      <Box bg="#414c52">
        <Badge variant="dark">Dark Badge</Badge>
      </Box>
      <Box>
        <Badge variant="danger">Danger Badge</Badge>
      </Box>
      <Box>
        <Badge variant="notify">Notify Badge</Badge>
      </Box>
      <Box>
        <Badge variant="info">Info Badge</Badge>
      </Box>
      <Box>
        <Badge mr={2} variant="warning">
          Warning Badge
        </Badge>
        <Badge bg="grayLite.0" color="success">
          Different text color and font-size
        </Badge>
      </Box>
      <Box>
        <Badge variant="success">Success Badge</Badge>
      </Box>
      <Flex m={0} p={0}>
        <Box>
          <Badge mr={2} variant="info">
            Print
          </Badge>
          <Badge mr={2} variant="info">
            Broadcast
          </Badge>
          <Badge mr={2} variant="info">
            Radio
          </Badge>
          <Badge>Article</Badge>
        </Box>
      </Flex>
      <Flex m={0} p={0}>
        <Box>
          <Badge>Article</Badge>
          <Badge ml={2} variant="info">
            Print
          </Badge>
          <Badge ml={2} variant="info">
            Broadcast
          </Badge>
          <Badge ml={2} variant="info">
            Radio
          </Badge>
        </Box>
      </Flex>
    </Box>
  ));
