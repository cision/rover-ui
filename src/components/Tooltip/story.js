/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean,
  number,
  optionsKnob as options,
  text,
} from '@storybook/addon-knobs';

import Tooltip, { directions } from './';
import Button from '../Button';
import Readme from './README.md';

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
      isOpen={open}
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

SBTooltip.propTypes = {
  ...Tooltip.propTypes,
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

const Overview = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(prev => !prev);
  };

  const direction = options(
    'Direction',
    directions,
    directions[0],
    {
      display: 'inline-radio',
    },
    'all'
  );
  const textHover = boolean('Show on hover', true, 'text');

  return (
    <FlexWrapper>
      <Element>
        <Tooltip
          content={text('Tooltip Text', 'Hi there!', 'text')}
          showOnHover={textHover}
          direction={direction}
          isOpen={boolean('Open', false, 'text')}
        >
          <Button>{text('Main Content', 'With Text', 'text')}</Button>
        </Tooltip>
      </Element>
      <Tooltip
        isOpen={open}
        showOnHover={boolean('Show on hover', false, 'content')}
        direction={direction}
        closeable={toggle}
        tooltipWidth={`${number(
          'Width',
          300,
          { min: 10, max: 1000, step: 5 },
          'content'
        )}px`}
        content={
          <div>
            <h3 style={{ margin: '0 0 1em' }}>Article Reach</h3>
            <p style={{ margin: 0 }}>
              The expected readership (UVPM) of the next article they write,
              based on the average readership of the articles they&apos;ve
              written over the last 90 days.
            </p>
          </div>
        }
      >
        <Button onClick={toggle}>With content</Button>
      </Tooltip>
    </FlexWrapper>
  );
};

storiesOf('Planets/Tooltip', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => <Overview />)
  .add(
    'Hoverable',
    () => {
      return (
        <FlexWrapper>
          <Element>
            <Tooltip
              style={{ marginRight: '20px' }}
              showOnHover
              isOpen
              content="Hello, I'm on top!"
            >
              <div>Hover on the top</div>
            </Tooltip>
          </Element>
          <Element>
            <Tooltip
              style={{ marginRight: '20px' }}
              showOnHover
              direction="bottom"
              content="...and I'm on the bottom!"
            >
              <div>Hover on the bottom</div>
            </Tooltip>
          </Element>
          <Element>
            <Tooltip
              showOnHover
              direction="left"
              content="...and I'm on the left!"
            >
              <div>Hover on the left</div>
            </Tooltip>
          </Element>
          <Element>
            <Tooltip
              showOnHover
              direction="right"
              content="...and I'm on the right!"
            >
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
          tooltipWidth="225px"
        >
          Tooltip to Bottom
        </SBTooltip>
        <SBTooltip
          content={TooltipContent}
          closeable={action('closing tooltip on top')}
          direction="top"
          tooltipWidth="700px"
        >
          Tooltip to Top
        </SBTooltip>
        <SBTooltip
          content={TooltipContent}
          closeable={action('closing tooltip on right')}
          direction="right"
          tooltipWidth="225px"
        >
          Tooltip to Right
        </SBTooltip>
        <SBTooltip
          content={TooltipContent}
          closeable={action('closing tooltip on left')}
          closeOnEscape={false}
          direction="left"
          tooltipWidth="400px"
        >
          Tooltip to Left
        </SBTooltip>
      </FlexWrapper>
    ),
    {}
  );
