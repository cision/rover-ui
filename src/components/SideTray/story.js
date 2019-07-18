import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import SideTray from './';
import Button from '../Button';
import Readme from './README.md';

function SideTrayExample() {
  const [isSideTrayOpen, setSideTrayOpenState] = useState(false);

  const openSideTray = () => {
    setSideTrayOpenState(true);
  };
  const closeSideTray = () => {
    setSideTrayOpenState(false);
  };

  return (
    <div>
      <div>Hi! This is just the page.</div>
      <Button modifiers={['primary']} onClick={openSideTray}>
        Open tray
      </Button>
      <SideTray visible={isSideTrayOpen} onClose={closeSideTray}>
        <SideTray.Body>
          <div style={{ padding: '20px' }}>
            <p>Side Tray Content!</p>
            <p>You can close me by clicking outside,</p>
            <p>
              Clicking this{' '}
              <Button modifiers={['primary']} onClick={closeSideTray}>
                button
              </Button>
            </p>
            <p>Or clicking the &apos;esc&apos; key</p>
          </div>
        </SideTray.Body>
      </SideTray>
    </div>
  );
}

const renderContent = () => (
  <React.Fragment>
    <p>
      Body by default does <strong>not</strong> have padding. It stretches to
      fit the space, but everything else is up to you!
    </p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>And look at that, it scrolls!</p>
  </React.Fragment>
);

storiesOf('Star Systems/SideTray', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <SideTray visible onClose={() => {}}>
        <SideTray.Header>
          Header by default has padding and bottom border
        </SideTray.Header>
        <SideTray.Body>
          <div style={{ padding: `${text('padding amount', '30')}px` }}>
            {renderContent()}
          </div>
        </SideTray.Body>
        <SideTray.Footer>
          Footer by default has padding and top border
        </SideTray.Footer>
      </SideTray>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add('Example', () => <SideTrayExample />, {
    info: {
      inline: false,
      source: false,
    },
  });
