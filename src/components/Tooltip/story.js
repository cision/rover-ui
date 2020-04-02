/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';

import Tooltip from './';
import Button from '../Button';
import Readme from './README.md';

// eslint-disable-next-line react/prop-types
const SBTooltip = ({ children, ...rest }) => {
  const [open, setOpen] = useState(false);

  const TooltipContent = (
    <Fragment>
      <h3 style={{ margin: 0 }}>Hallo there!</h3>
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean
      </p>
    </Fragment>
  );

  return (
    <Tooltip
      content={TooltipContent}
      open={open}
      onClose={() => setOpen(false)}
      {...rest}
    >
      <Button style={{ marginRight: 10 }} onClick={() => setOpen(true)}>
        {children}
      </Button>
    </Tooltip>
  );
};

storiesOf('Planets/Tooltip', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      return (
        <Fragment>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              padding: '20px',
              height: '50vh',
            }}
          >
            <SBTooltip closeable direction="bottom" width="225px">
              Tooltip to Bottom
            </SBTooltip>
            <Tooltip
              open
              width="160px"
              content="hello with different with different content"
            >
              <div style={{ marginRight: '10px' }}>Another tooltip</div>
            </Tooltip>
            <SBTooltip closeable direction="top" width="700px">
              Tooltip to Top
            </SBTooltip>
            <SBTooltip closeable direction="left" width="400px">
              Tooltip to Left
            </SBTooltip>
            <SBTooltip closeable direction="right" width="225px">
              Tooltip to Right
            </SBTooltip>
          </div>
        </Fragment>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
