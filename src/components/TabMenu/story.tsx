import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import TabMenu, { EasyTabMenu, itemPadding } from './TabMenu';
import Readme from './README.md';

import { Wrap } from '../../stories/storybook-helpers';

const EXAMPLE_TABS = {
  home: 'home',
  about: 'about',
  contactUs: 'contact-us',
};

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
        <Wrap>
          <TabMenu align={alignment}>
            <TabMenu.Item>
              <a
                className={itemPadding}
                href="#nothing"
                onClick={(e) => {
                  e.preventDefault();
                  action('clicking Anything button')();
                }}
                role="tab"
                tabIndex={0}
              >
                Anything
              </a>
            </TabMenu.Item>
            <TabMenu.Item active>
              <a
                className={itemPadding}
                href="#nothing"
                onClick={(e) => {
                  e.preventDefault();
                  action('clicking active Goes button')();
                }}
                role="tab"
                tabIndex={0}
              >
                Goes
              </a>
            </TabMenu.Item>
            <TabMenu.Item>
              <a
                className={itemPadding}
                href="#nothing"
                onClick={(e) => {
                  e.preventDefault();
                  action('clicking Here button')();
                }}
                role="tab"
                tabIndex={0}
              >
                Here
              </a>
            </TabMenu.Item>
          </TabMenu>
        </Wrap>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add('Example', () => {
    const [tab, setTab] = useState(EXAMPLE_TABS.home);

    return (
      <Wrap>
        <TabMenu aria-label="Navigation tabs" className="border-b">
          <TabMenu.Item active={tab === EXAMPLE_TABS.home}>
            <span
              className="whitespace-no-wrap px-2 py-3 outline-none inline-block"
              role="tab"
              tabIndex={0}
              onClick={() => {
                setTab(EXAMPLE_TABS.home);
              }}
            >
              Home
            </span>
          </TabMenu.Item>
          <TabMenu.Item active={tab === EXAMPLE_TABS.about}>
            <span
              className="whitespace-no-wrap py-3 outline-none inline-block"
              onClick={() => {
                setTab(EXAMPLE_TABS.about);
              }}
              role="tab"
              tabIndex={0}
            >
              About
            </span>
          </TabMenu.Item>
          <TabMenu.Item active={tab === EXAMPLE_TABS.contactUs}>
            <span
              className="whitespace-no-wrap py-3 outline-none inline-block"
              onClick={() => {
                setTab(EXAMPLE_TABS.contactUs);
              }}
              role="tab"
              tabIndex={0}
            >
              Contact Us
            </span>
          </TabMenu.Item>
        </TabMenu>
        <div className="whitespace-no-wrap py-3">
          <>
            {tab === EXAMPLE_TABS.home && <p>Home</p>}
            {tab === EXAMPLE_TABS.about && <p>About</p>}
            {tab === EXAMPLE_TABS.contactUs && <p>Contact us</p>}
          </>
        </div>
      </Wrap>
    );
  });

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
        <div className="flex">
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
        <Wrap>
          <EasyTabMenu
            align={alignment}
            size={sizeOptions}
            tabs={[
              { key: 'ONE', label: 'One', onClick: action('ONE tab') },
              { key: 'TWO', label: 'Two', onClick: action('TWO tab') },
              {
                key: 'THREE',
                label: 'Three',
                onClick: action('THREE tab'),
              },
            ]}
            activeTab={activeTab}
          />
        </Wrap>
      );
    }
    return (
      <Wrap>
        <EasyTabMenu
          className="border-b"
          align={alignment}
          size={sizeOptions}
          tabs={[
            { key: 'ONE', label: 'One', onClick: action('ONE tab') },
            { key: 'TWO', label: 'Two', onClick: action('TWO tab') },
            {
              key: 'THREE',
              label: 'Three',
              onClick: action('THREE tab'),
            },
          ]}
          activeTab={activeTab}
        />
      </Wrap>
    );
  });
