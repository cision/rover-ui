import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import SideTray from './';
import Readme from './README.md';

function SideTrayTest() {
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
      <button onClick={openSideTray}>Open tray</button>
      <SideTray visible={isSideTrayOpen} closeCallback={closeSideTray}>
        <div style={{ padding: '20px' }}>
          <p>Side Tray Content!</p>
          <p>You can close me by clicking outside,</p>
          <p>
            Clicking this <button onClick={closeSideTray}>button</button>
          </p>
          <p>Or clicking the &apos;esc&apos; key</p>
        </div>
      </SideTray>
    </div>
  );
}

storiesOf('Star System/SideTray', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => <SideTrayTest />, {
    info: {
      inline: true,
      source: true,
    },
  });
