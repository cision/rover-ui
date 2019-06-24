import React from 'react';
import { storiesOf } from '@storybook/react';

import Media from './';
import Paper from '../Paper';
import Readme from './README.md';

storiesOf('Dark Matter/Media', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Media tag="main">
        <Media.Item tag="span">
          <Paper mx="sm">Item 1</Paper>
        </Media.Item>
        <Media.Body px="sm">
          <Paper mb="lg">Main Content Body</Paper>

          <Media>
            <Media.Item p="md" tag="div">
              Just a small thing
            </Media.Item>
            <Media.Body>
              <Paper bg="dark">
                <span>Moar nested content!</span>
              </Paper>
            </Media.Body>
          </Media>
        </Media.Body>
        <Media.Item>
          <Paper mx="sm">Item 2</Paper>
        </Media.Item>
        <Media.Item>
          <Paper mx="sm">Item 3</Paper>
        </Media.Item>
      </Media>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
