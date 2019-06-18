import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { alignSelf, justifyContent, flex, space } from 'styled-system';

import theme from '../../shared/theme.js';
import Badge, { variants } from './';
import Readme from './README.md';
import Paper from '../Paper';

const Flex = styled.div({ display: 'flex' }, flex, space);

Flex.defaultProps = {
  justifyContent: 'flex-start',
  flex: '1 0 auto',
  p: 'md',
  mb: 0,
};

Flex.displayName = 'Flex';

const Box = styled(Paper)(alignSelf, justifyContent);

Box.displayName = 'Box';

Box.defaultProps = {
  alignSelf: 'flex-start',
  justifyContent: 'center',
  p: 'md',
  mb: 'sm',
  mx: 'sm',
};

storiesOf('Planets/Badge', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const colorOptions = variants;

      const fontSize = select('Font size', theme.fontSizes.map((_, i) => i), 2);
      const variant = select('Variant', colorOptions, '');

      return (
        <Box m="sm" p="2xl">
          <Badge fontSize={fontSize} variant={variant}>
            {text('Children', 'My Badge')}
          </Badge>
        </Box>
      );
    },
    {
      info: {
        inline: true,
      },
    }
  )
  .add('Examples', () => (
    <React.Fragment>
      <Box>
        <Badge>My Badge</Badge>
        <Badge ml="sm" bg="geyser" color="gray">
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
        <Badge mr="sm" variant="warning">
          Warning Badge
        </Badge>
        <Badge bg="shuttle-gray" color="success">
          Different text color and font-size
        </Badge>
      </Box>
      <Box>
        <Badge variant="success">Success Badge</Badge>
      </Box>
      <Box>
        <Flex m={0} p={0}>
          <Badge mr="sm" variant="info">
            Print
          </Badge>
          <Badge mr="sm" variant="info">
            Broadcast
          </Badge>
          <Badge mr="sm" variant="info">
            Radio
          </Badge>
          <Badge>Article</Badge>
        </Flex>
      </Box>
      <Box>
        <Flex m={0} p={0}>
          <Badge>Article</Badge>
          <Badge ml="sm" variant="info">
            Print
          </Badge>
          <Badge ml="sm" variant="info">
            Broadcast
          </Badge>
          <Badge ml="sm" variant="info">
            Radio
          </Badge>
        </Flex>
      </Box>
    </React.Fragment>
  ));
