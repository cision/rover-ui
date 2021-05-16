import React from 'react';

import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Wrap } from '../../../../stories/storybook-helpers';

import Media from '../../../Media';

import Menu from '../Menu';

import Item from '.';
import Readme from './README.md';

storiesOf('Star Systems/Dropdown/Menu/Item', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => (
    <Wrap>
      <Menu
        isOpen
        style={{
          position: 'initial',
        }}
      >
        <Item
          onClick={
            select('onClick', ['() => {}', 'undefined'], '() => {}') ===
            'undefined'
              ? undefined
              : () => {}
          }
        >
          {text('children', 'Dropdown menu item text')}
        </Item>
      </Menu>
    </Wrap>
  ))
  .add(
    'Examples',
    () => (
      <Wrap>
        <Menu
          isOpen
          style={{
            position: 'initial',
          }}
        >
          <Item>With basic text content, no onClick</Item>
          <Item onClick={action('onClick')}>
            With basic text content, and onClick
          </Item>
          <Item>
            <Media>
              <Media.Item mr="md">
                <img
                  alt="Random from Unsplash"
                  style={{ borderRadius: '20px' }}
                  src="https://source.unsplash.com/random/40x40"
                />
              </Media.Item>
              <Media.Body>
                <span>With some React node content, no onClick</span>
              </Media.Body>
            </Media>
          </Item>
          <Item onClick={action('onClick')}>
            <Media>
              <Media.Item mr="md">
                <img
                  alt="Random from Unsplash"
                  style={{ borderRadius: '20px' }}
                  src="https://source.unsplash.com/random/40x40"
                />
              </Media.Item>
              <Media.Body>
                <span>With some React node content, and onClick</span>
              </Media.Body>
            </Media>
          </Item>
        </Menu>
      </Wrap>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
