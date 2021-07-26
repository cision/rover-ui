import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Media from '../../../Media';

import Item from '.';
import Readme from './README.md';

storiesOf('Star Systems/Dropdown/Menu/Item', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => (
    <div
      style={{
        margin: '0 auto',
        width: '300px',
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
    </div>
  ))
  .add(
    'Examples',
    () => (
      <div
        style={{
          margin: '0 auto',
          width: '300px',
          background: 'white',
        }}
      >
        <Item>With basic text content, no onClick</Item>
        <Item onClick={action('onClick')}>
          With basic text content, and onClick
        </Item>
        <Item
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          With an href
        </Item>
        <Item>
          <Media>
            <Media.Item className="mr-2">
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
            <Media.Item className="mr-2">
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
      </div>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
