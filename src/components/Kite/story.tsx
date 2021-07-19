import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

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
      <Kite visible={isOpen} onClose={hideKite}>
        <Kite.Header canBeDismissed title="The Title" onClose={hideKite}>
          <Kite.Icon
            fill="green"
            height="20"
            name="check"
            style={{ display: 'block' }}
            width="20"
          />
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
      <Kite visible={isOpen} onClose={hideKite} ttl={3000}>
        <Kite.Header canBeDismissed title="Error Kite" onClose={hideKite}>
          <Kite.Icon
            fill="red"
            height="20"
            name="warning"
            style={{ display: 'block' }}
            width="20"
          />
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
      <Kite visible={isOpen} onClose={hideKite}>
        <Kite.Header
          canBeDismissed
          title="Kite with content"
          onClose={hideKite}
        >
          <Kite.Icon
            fill="red"
            height="20"
            name="warning"
            style={{ display: 'block' }}
            width="20"
          />
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
      <Kite visible={false} ttl={3000} onClose={() => {}}>
        <Kite.Header canBeDismissed title="Kite Title" onClose={() => {}}>
          <Kite.Icon
            fill="green"
            height="20"
            name="check"
            style={{ display: 'block' }}
            width="20"
          />
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
