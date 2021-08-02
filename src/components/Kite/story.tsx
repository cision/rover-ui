import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number, object } from '@storybook/addon-knobs';

import Kite from '.';
import Readme from './README.md';
import { Wrap } from '../../stories/storybook-helpers';
import Button from '../Button';

function KiteExample() {
  const [isOpen, setIsOpen] = useState(false);

  const showKite = () => {
    setIsOpen(true);
  };

  const hideKite = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <Button modifiers={['primary']} onClick={showKite}>
          Show Kite
        </Button>
      </div>
      <Kite canBeDismissed visible={isOpen} onClose={hideKite}>
        <Kite.Header
          iconProps={{
            fill: 'green',
            height: '20',
            name: 'check',
            style: { display: 'block' },
            width: '20',
          }}
        >
          The Title
        </Kite.Header>
      </Kite>
    </>
  );
}

function ErrorKiteExample() {
  const [isOpen, setIsOpen] = useState(false);

  const showKite = () => {
    setIsOpen(true);
  };

  const hideKite = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <Button modifiers={['primary']} onClick={showKite}>
          Error Kite
        </Button>
      </div>
      <Kite canBeDismissed visible={isOpen} onClose={hideKite} ttl={3000}>
        <Kite.Header
          iconProps={{
            fill: 'red',
            height: '20',
            name: 'warning',
            style: { display: 'block' },
            width: '20',
          }}
        >
          Error Kite
        </Kite.Header>
      </Kite>
    </>
  );
}

function EverythingKiteExample() {
  const [isOpen, setIsOpen] = useState(false);

  const showKite = () => {
    setIsOpen(true);
  };

  const hideKite = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <Button modifiers={['primary']} onClick={showKite}>
          Everything Kite
        </Button>
      </div>
      <Kite canBeDismissed visible={isOpen} onClose={hideKite}>
        <Kite.Header
          iconProps={{
            fill: 'red',
            height: '20',
            name: 'warning',
            style: { display: 'block' },
            width: '20',
          }}
        >
          Kite with content
        </Kite.Header>
        <Kite.Content>
          <div className="t-flex">
            <div>
              <span>The quick brown fox jumps over the lazy dog!</span>
            </div>
            <div className="mt-2">
              <Button modifiers={['primary']} onClick={() => {}}>
                Click me!
              </Button>
            </div>
          </div>
        </Kite.Content>
      </Kite>
    </>
  );
}

storiesOf('Galaxies/Kite', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Kite
        canBeDismissed={boolean('canBeDismissed', true, 'Kite')}
        visible={boolean('visible', false, 'Kite')}
        ttl={number('ttl', 3000, undefined, 'Kite')}
        onClose={action('onClose')}
      >
        <Kite.Header
          iconProps={object(
            'iconProps',
            {
              fill: 'green',
              height: '20',
              name: 'check',
              style: { display: 'block' },
              width: '20',
            },
            'Kite.Header'
          )}
        >
          Kite Title
        </Kite.Header>
      </Kite>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Examples',
    () => (
      <>
        <Wrap>
          <KiteExample />
        </Wrap>
        <Wrap>
          <ErrorKiteExample />
        </Wrap>
        <Wrap>
          <EverythingKiteExample />
        </Wrap>
      </>
    ),
    {
      info: {
        inline: false,
        source: false,
      },
    }
  );
