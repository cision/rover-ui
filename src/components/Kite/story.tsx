import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { iconsMap } from '../Icon';
import { Wrap } from '../../stories/storybook-helpers';
import Button from '../Button';
import Readme from './README.md';
import Kite from '.';

const iconNames = Object.keys(iconsMap);

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
      <Kite
        icon={<Kite.Icon fill="green" height="20" name="check" width="20" />}
        canBeDismissed
        visible={isOpen}
        onClose={hideKite}
      >
        <Kite.Body>The Title Content</Kite.Body>
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
      <Kite
        icon={<Kite.Icon fill="red" height="20" name="warning" width="20" />}
        canBeDismissed
        visible={isOpen}
        onClose={hideKite}
      >
        <Kite.Header>Error Kite</Kite.Header>
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
      <Kite
        icon={<Kite.Icon fill="red" height="20" name="warning" width="20" />}
        canBeDismissed
        visible={isOpen}
        onClose={hideKite}
      >
        <Kite.Header>Kite with content</Kite.Header>
        <Kite.Body>
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
        </Kite.Body>
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
        icon={
          <Kite.Icon
            fill={text('fill (CSS color)', 'green', 'Kite.Icon')}
            height={text('height', '20', 'Kite.Icon')}
            name={select('name', iconNames, 'check', 'Kite.Icon')}
            width={text('width', '20', 'Kite.Icon')}
          />
        }
        canBeDismissed={boolean('canBeDismissed', true, 'Kite')}
        visible={boolean('visible', false, 'Kite')}
        ttl={number('ttl', 3000, undefined, 'Kite')}
        onClose={action('onClose')}
      >
        <Kite.Header>
          {text('children', 'Kite header', 'Kite.Header')}
        </Kite.Header>
        <Kite.Body>
          {text('children', 'Kite description', 'Kite.Body')}
        </Kite.Body>
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
