import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { alignSelf, justifyContent, flex, space } from 'styled-system';

import Badge, { variants } from './Badge';
import Readme from './README.md';
import Paper from '../Paper';

const FlexBase = styled.div({ display: 'flex' }, flex, space);

const Flex = (props) => {
  return (
    <FlexBase
      justifyContent="flex-start"
      flex="1 0 atuo"
      p="md"
      mb={0}
      {...props}
    />
  );
};

const Box = styled(Paper)(space, alignSelf, justifyContent);

Box.displayName = 'Box';
Box.defaultProps = {
  mb: '15px',
};

const fontSizes = {
  base: 'var(--rvr-font-size-base)',
  sm: 'var(--rvr-font-size-sm)',
  md: 'var(--rvr-font-size-md)',
  h4: 'var(--rvr-font-size-h4)',
  h3: 'var(--rvr-font-size-h3)',
  h2: 'var(--rvr-font-size-h2)',
  h1: 'var(--rvr-font-size-h1)',
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
      const fontSize = select('Font size', fontSizes, 'sm');
      const variant = select('variant', variants, '');
      const round = boolean('round', false);

      const styles = { fontSize };

      return (
        <Box style={{ marginBottom: '10px' }} p="2xl">
          <Badge round={round} style={styles} variant={variant}>
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
    <>
      <Box>
        <Badge>My Badge</Badge>
        <Badge>Other</Badge>
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
        <Badge variant="warning">Warning Badge</Badge>
        <Badge variant="success">Different text color and font-size</Badge>
      </Box>
      <Box>
        <Badge variant="success">Success Badge</Badge>
      </Box>
      <Box>
        <Flex m={0} p={0}>
          <Badge round style={{ marginRight: '10px' }} variant="info">
            Print
          </Badge>
          <Badge round style={{ marginRight: '10px' }} variant="info">
            Broadcast
          </Badge>
          <Badge round style={{ marginRight: '10px' }} variant="info">
            Radio
          </Badge>
          <Badge>Article</Badge>
        </Flex>
      </Box>
      <Box>
        <Flex m={0} p={0}>
          <Badge>Article</Badge>
          <Badge round style={{ marginLeft: '10px' }} variant="info">
            Print
          </Badge>
          <Badge round style={{ marginLeft: '10px' }} variant="info">
            Broadcast
          </Badge>
          <Badge round style={{ marginLeft: '10px' }} variant="info">
            Radio
          </Badge>
        </Flex>
      </Box>
    </>
  ));
