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
    'Examples',
    () => (
      <React.Fragment>
        <h2>Basic Usage</h2>
        <Media tag="main">
          <Media.Item>Item 1</Media.Item>
          <Media.Item>Item 2</Media.Item>
          <Media.Body>Body</Media.Body>
          <Media.Item>Item 3</Media.Item>
          <Media.Item>Item 4</Media.Item>
        </Media>

        <h2>With Nesting</h2>
        <Media>
          <Media.Item>Item 1</Media.Item>
          <Media.Body>
            <Media>
              <Media.Item>Nested Item 1</Media.Item>
              <Media.Body>Nested Body 2</Media.Body>
            </Media>
          </Media.Body>
          <Media.Item>Item 2</Media.Item>
        </Media>

        <h2>With Nesting</h2>
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
      </React.Fragment>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
