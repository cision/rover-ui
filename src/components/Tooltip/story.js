/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Tooltip from './';
import Button from '../Button';
import Readme from './README.md';

export default {
  title: 'Planets/Tooltip',
  component: Tooltip,
};

const TooltipContent = (
  <Fragment>
    <h3 style={{ margin: 0 }}>Hallo there!</h3>
    <p>
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean
    </p>
  </Fragment>
);

// eslint-disable-next-line react/prop-types
const SBTooltip = ({ children, closeable, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      open={open}
      closeable={() => {
        setOpen(false);
        closeable();
      }}
      {...rest}
    >
      <Button style={{ marginRight: 10 }} onClick={() => setOpen(true)}>
        {children}
      </Button>
    </Tooltip>
  );
};

const FlexWrapper = props => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      padding: '20px',
      height: '50vh',
    }}
    {...props}
  />
);

const Element = props => <div style={{ marginRight: 20 }} {...props} />;

storiesOf('Planets/Tooltip', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Hoverable',
    () => {
      return (
        <FlexWrapper>
          <Element>
            <Tooltip
              style={{ marginRight: '20px' }}
              hover
              open
              text="Hello, I'm on top!"
            >
              <div>Hover on the top</div>
            </Tooltip>
          </Element>
          <Element>
            <Tooltip
              style={{ marginRight: '20px' }}
              hover
              direction="bottom"
              text="...and I'm on the bottom!"
            >
              <div>Hover on the bottom</div>
            </Tooltip>
          </Element>
          <Element>
            <Tooltip hover direction="left" text="...and I'm on the left!">
              <div>Hover on the left</div>
            </Tooltip>
          </Element>
          <Element>
            <Tooltip hover direction="right" text="...and I'm on the right!">
              <div>Hover on the right</div>
            </Tooltip>
          </Element>
        </FlexWrapper>
      );
    },
    {}
  )
  .add(
    'Closeable',
    () => (
      <FlexWrapper>
        <SBTooltip
          content={TooltipContent}
          closeable={action('closing tooltip on bottom')}
          direction="bottom"
          width="225px"
        >
          Tooltip to Bottom
        </SBTooltip>
        <SBTooltip
          content={TooltipContent}
          closeable={action('closing tooltip on top')}
          direction="top"
          width="700px"
        >
          Tooltip to Top
        </SBTooltip>
        <SBTooltip
          content={TooltipContent}
          closeable={action('closing tooltip on right')}
          direction="right"
          width="225px"
        >
          Tooltip to Right
        </SBTooltip>
        <SBTooltip
          content={TooltipContent}
          closeable={action('closing tooltip on left')}
          direction="left"
          width="400px"
        >
          Tooltip to Left
        </SBTooltip>
      </FlexWrapper>
    ),
    {}
  );
