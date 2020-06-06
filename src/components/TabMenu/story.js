import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import TabMenu, { EasyTabMenu, itemPadding } from './';
import Readme from './README.md';

storiesOf('Star Systems/TabMenu', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const alignment = select('align', ['left', 'center', 'right'], 'left');
      return (
        <TabMenu align={alignment}>
          <TabMenu.Item>
            <a
              className={itemPadding}
              href="#nothing"
              onClick={action()}
              role="button"
              tabIndex={0}
            >
              Anything
            </a>
          </TabMenu.Item>
          <TabMenu.Item>
            <a
              className={`${itemPadding} active`}
              href="#nothing"
              onClick={action()}
              role="button"
              tabIndex={0}
            >
              Goes
            </a>
          </TabMenu.Item>
          <TabMenu.Item>
            <a
              className={itemPadding}
              href="#nothing"
              onClick={action()}
              role="button"
              tabIndex={0}
            >
              Here
            </a>
          </TabMenu.Item>
        </TabMenu>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );

storiesOf('Star Systems/TabMenu/Item', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      return (
        <div style={{ display: 'flex' }}>
          <TabMenu.Item active={boolean('active', true)}>
            <span className={itemPadding}>{text('children', 'Text Here')}</span>
          </TabMenu.Item>
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

storiesOf('Star Systems/TabMenu/EasyTabMenu', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => {
    const withContainer = boolean('With Container', false);
    const sizeOptions = select('size', ['xs', 'sm', 'md', 'lg'], 'sm');
    const activeTab = select('activeTab', ['ONE', 'TWO', 'THREE'], 'ONE');
    const alignment = select('align', ['left', 'center', 'right'], 'left');
    if (!withContainer) {
      return (
        <EasyTabMenu
          align={alignment}
          size={sizeOptions}
          tabs={[
            { key: 'ONE', label: 'One', onClick: action() },
            { key: 'TWO', label: 'Two', onClick: action() },
            {
              key: 'THREE',
              label: 'Three',
              onClick: action(),
            },
          ]}
          activeTab={activeTab}
        />
      );
    }
    return (
      <div style={{ background: '#ffffff', padding: '0px 20px' }}>
        <EasyTabMenu
          style={{ borderBottom: '1px solid #ccc' }}
          align={alignment}
          size={sizeOptions}
          tabs={[
            { key: 'ONE', label: 'One', onClick: action() },
            { key: 'TWO', label: 'Two', onClick: action() },
            {
              key: 'THREE',
              label: 'Three',
              onClick: action(),
            },
          ]}
          activeTab={activeTab}
        />
      </div>
    );
  });
