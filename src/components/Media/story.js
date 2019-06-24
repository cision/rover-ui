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
            <Paper>
              <Media>
                <Media.Item pr="md">
                  <img src="https://placekitten.com/150/100" alt="" />
                </Media.Item>
                <Media.Body>
                  <h2>Kittehs!</h2>
                </Media.Body>
              </Media>
            </Paper>
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
