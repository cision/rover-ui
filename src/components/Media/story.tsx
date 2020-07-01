import React from 'react';
import times from 'lodash/times';
import { storiesOf } from '@storybook/react';
import { number, text } from '@storybook/addon-knobs';

import Media from '.';
import Readme from './README.md';
import { Wrap, Title } from '../../stories/storybook-helpers';

storiesOf('Dark Matter/Media', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const paperClassName = text(
        'className (Media.Item)',
        'm-2 bg-gray-700 text-gray-100 p-5 rounded shadow-md'
      );
      const beforeCount = number('Items Before', 2);
      const afterCount = number('Items After', 2);

      const itemsBefore = times(beforeCount).map((idx) => {
        return (
          <Media.Item className={paperClassName} key={idx}>
            {idx + 1}
          </Media.Item>
        );
      });

      const itemsAfter = times(afterCount).map((idx) => {
        return (
          <Media.Item className={paperClassName} key={idx}>
            {idx + 1}
          </Media.Item>
        );
      });

      return (
        <>
          <Media>
            {itemsBefore}
            <Media.Body className={paperClassName}>Body</Media.Body>
            {itemsAfter}
          </Media>
        </>
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
      <>
        <Wrap>
          <Title>Basic Usage</Title>

          <Media className="mt-3">
            <Media.Item className="mr-3">
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
        </Wrap>

        <Wrap>
          <Title>With Nesting</Title>

          <Media className="mt-3">
            <Media.Item className="mr-3">
              <img width="100" src="https://placebeard.it/100x100" alt="" />
            </Media.Item>
            <Media.Body>
              <h3>Hi, this is John Doe!</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <Media className="mt-4">
                <Media.Item className="mr-3">
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
        </Wrap>

        <Wrap>
          <Title>Example Use with Horizontal Organization</Title>
          <Media className="mr-2">
            <Media.Item className="p-4 text-gray-800 mr-2 shadow rounded">
              Item 1
            </Media.Item>
            <Media.Body className="mx-2 px-2 bg-blue-200 shadow-xl rounded text-blue-900 p-3 pt-3">
              <Media className="justify-center">
                <Media.Body>
                  <img
                    className="mt-0 mx-auto"
                    src="https://placekitten.com/150/100"
                    alt=""
                  />
                </Media.Body>
              </Media>
            </Media.Body>
            <Media.Item className="p-4 text-gray-800 mx-2 shadow rounded">
              Item 2
            </Media.Item>
            <Media.Item className="p-4 text-gray-800 ml-2 shadow rounded">
              Item 3
            </Media.Item>
          </Media>
        </Wrap>
      </>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
