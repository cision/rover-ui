import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';

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

storiesOf('Star Systems/SideTray', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <SideTray
        visible={boolean('visible', true)}
        onClose={action('onClose')}
        height={text('height', '100vh')}
        width={text('width', '400px')}
        direction={select(
          'direction',
          {
            't (top)': 't',
            'b (bottom)': 'b',
            'r (right)': 'r',
            'l (left)': 'l',
          },
          'r'
        )}
      >
        <SideTray.Header>
          Header by default has padding and bottom border
        </SideTray.Header>
        <SideTray.Body>
          <div style={{ padding: `${text('padding amount', '30')}px` }}>
            <p>
              Body by default does <strong>not</strong> have padding. It
              stretches to fit the space, but everything else is up to you!
            </p>
            <div style={{ height: '110vh' }}>
              scroll{' '}
              <span aria-label="point down" role="img">
                👇👇
              </span>
            </div>
            <p>And look at that, it scrolls!</p>
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
