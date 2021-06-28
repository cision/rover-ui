import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Kite from '.';
import Readme from './README.md';
import { Wrap } from '../../stories/storybook-helpers';
import Button from '../Button';
import Icon from '../Icon';

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
        title="Success Kite!"
        canBeDismissed
        visible={isOpen}
        onClose={hideKite}
        ttl={3000}
      >
        <Kite.KiteIcon>
          <Icon
            fill="green"
            height="20"
            name="check"
            style={{ display: 'block' }}
            width="20"
          />
        </Kite.KiteIcon>
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
        title="Error Kite!"
        canBeDismissed
        visible={isOpen}
        onClose={hideKite}
        ttl={3000}
      >
        <Kite.KiteIcon>
          <Icon
            fill="red"
            height="20"
            name="warning"
            style={{ display: 'block' }}
            width="20"
          />
        </Kite.KiteIcon>
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
        visible={false}
        title="Kite component!"
        canBeDismissed
        ttl={3000}
        onClose={() => {}}
      >
        <Kite.KiteIcon>
          <Icon
            fill="green"
            height="20"
            name="check"
            style={{ display: 'block' }}
            width="20"
          />
        </Kite.KiteIcon>
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
      </>
    ),
    {
      info: {
        inline: false,
        source: false,
      },
    }
  );
