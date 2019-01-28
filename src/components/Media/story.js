import React from 'react';
import { times } from 'lodash';
import { storiesOf } from '@storybook/react';
import { number, text, select } from '@storybook/addon-knobs';

import Media from './';
import Paper from '../Paper';
import Readme from './README.md';
import { spaceMap } from '../../shared/sizing';

storiesOf('Dark Matter/Media', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const spacing = select('Spacing', spaceMap, 'xs');
      const mediaTag = text('Media Tag', 'div');
      const beforeCount = number('Items Before', 2);
      const afterCount = number('Items After', 2);

      const itemsBefore = times(beforeCount).map(idx => {
        return (
          <Media.Item key={idx}>
            <Paper m={spacing}>{idx + 1}</Paper>
          </Media.Item>
        );
      });

      const itemsAfter = times(afterCount).map(idx => {
        return (
          <Media.Item key={idx}>
            <Paper m={spacing}>{idx + 1}</Paper>
          </Media.Item>
        );
      });

      return (
        <React.Fragment>
          <Media tag={mediaTag}>
            {itemsBefore}
            <Media.Body>
              <Paper m={spacing}>Body</Paper>
            </Media.Body>
            {itemsAfter}
          </Media>
        </React.Fragment>
      );
    },
    {
      inline: true,
      source: true,
    }
  )
  .add(
    'Examples',
    () => (
      <React.Fragment>
        <Paper mx="md" mb="md">
          <h2>Basic Usage</h2>

          <Media mt="md" tag="main">
            <Media.Item mr="md">
              <img width="100" src="https://placebeard.it/100x100" alt="" />
            </Media.Item>
            <Media.Body>
              <h3>Hi, this is John Doe!</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Media.Body>
          </Media>
        </Paper>

        <Paper mx="md" mb="md">
          <h2>With Nesting</h2>

          <Media mt="md" tag="main">
            <Media.Item mr="md">
              <img width="100" src="https://placebeard.it/100x100" alt="" />
            </Media.Item>
            <Media.Body>
              <h3>Hi, this is John Doe!</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <Media mt="lg" tag="main">
                <Media.Item mr="md">
                  <img src="https://placekitten.com/100" alt="" />
                </Media.Item>
                <Media.Body>
                  <h3>Hi, this is Jane Doe!</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </Media.Body>
              </Media>
            </Media.Body>
          </Media>
        </Paper>

        <Paper color="porcelain" bg="river-bed" mx="md" mb="md">
          <h2>Example Use with Horizontal Organization</h2>
          <Media mt="sm" tag="main">
            <Media.Item tag="span">
              <Paper mr="sm">Item 1</Paper>
            </Media.Item>
            <Media.Body px="sm">
              <Paper>
                <Media justifyContent="center">
                  <Media.Body>
                    <img
                      style={{ margin: '0 auto' }}
                      src="https://placekitten.com/150/100"
                      alt=""
                    />
                  </Media.Body>
                </Media>
              </Paper>
            </Media.Body>
            <Media.Item>
              <Paper mx="sm">Item 2</Paper>
            </Media.Item>
            <Media.Item>
              <Paper ml="sm">Item 3</Paper>
            </Media.Item>
          </Media>
        </Paper>
      </React.Fragment>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
