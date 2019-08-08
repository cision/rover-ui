import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Button from '../Button';
import EasyDropdown from './';
import Readme from './README.md';

const defaultIsOpenOptions = ['true', 'false', 'undefined'];

storiesOf('Uncategorized/EasyDropdown', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const customMenuItems = object('menuItems', [
        { label: 'Item 1', onClick: 'IRL your function will go here' },
        {
          label: 'Item 2',
          group: 'Group 1',
          onClick: 'IRL your function will go here',
        },
        {
          label: 'Item 3',
          group: 'Group 1',
          onClick: 'IRL your function will go here',
        },
        { label: 'Item 4', onClick: 'IRL your function will go here' },
        { label: 'Item 5', onClick: 'IRL your function will go here' },
        {
          label: 'Item 5',
          group: 'Group 2',
          onClick: 'IRL your function will go here',
        },
        {
          label: 'Item 6',
          group: 'Group 3',
          onClick: 'IRL your function will go here',
        },
      ]);

      const customDefaultIsOpen = select(
        'defaultIsOpen',
        defaultIsOpenOptions,
        'false'
      );

      const defaultIsOpen =
        customDefaultIsOpen === 'undefined'
          ? undefined
          : JSON.parse(customDefaultIsOpen);

      const menuItems = customMenuItems.map(a => ({
        ...a,
        onClick: action(a.label),
      }));

      return (
        <EasyDropdown
          menuItems={menuItems}
          defaultIsOpen={defaultIsOpen}
          onToggle={action('onToggle')}
        >
          Toggle me!
        </EasyDropdown>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Examples',
    () => {
      return (
        <div>
          <EasyDropdown
            menuItems={[
              { label: 'I do nothing!' },
              { label: 'Click me!', onClick: () => {} },
              { label: "I'm in a group", onClick: () => {}, group: 'Group 1' },
              { label: 'Me too', onClick: () => {}, group: 'Group 1' },
              { label: 'Also me', onClick: () => {}, group: 'Group 1' },
            ]}
            defaultIsOpen={false}
          >
            Simple config
          </EasyDropdown>
          <br />
          <br />
          <EasyDropdown
            menuItems={[{ label: 'Click me!', onClick: () => {} }]}
            defaultIsOpen={false}
          >
            <button type="button" onClick={action('Custom toggle onClick')}>
              Custom toggle
            </button>
          </EasyDropdown>
          <br />
          <br />
          <EasyDropdown
            menuItems={[
              {
                label: 'Custom menu item',
                children: (
                  <Button
                    level="teal"
                    style={{
                      display: 'block',
                      borderRadius: '0',
                      width: '100%',
                    }}
                  >
                    I&apos;m fancy
                  </Button>
                ),
                onClick: action('Custom menu item onClick'),
                style: { padding: '0' },
              },
            ]}
            defaultIsOpen={false}
          >
            Custom button in the dropdown!
          </EasyDropdown>
        </div>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
