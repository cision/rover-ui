import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Icon from '../Icon';
import ExpansionPanel from '.';
import Readme from './README.md';
import { Wrap, Title } from '../../stories/storybook-helpers';

storiesOf('Galaxies/ExpansionPanel', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Wrap>
        <ExpansionPanel
          expanded={boolean('expanded', false)}
          onToggle={action('onToggle')}
          collapseProps={object('collapseProps', { timeout: 200 })}
          style={object('style', {})}
          className={text(
            'className',
            'w-2/3 shadow-xl rounded overflow-hidden'
          )}
        >
          <ExpansionPanel.Header
            className={text('className (Header)', 'bg-gray-300 p-3')}
          >
            Header
          </ExpansionPanel.Header>
          <ExpansionPanel.Body
            className={text(
              'className (Body)',
              'p-4  border-t-2 border-gray-400'
            )}
          >
            ├── Body
          </ExpansionPanel.Body>
        </ExpansionPanel>
      </Wrap>
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
    () => {
      return (
        <Fragment>
          <Wrap>
            <Title>Controlled (adjust from Knobs)</Title>
            <ExpansionPanel expanded={boolean('expanded', false)}>
              <ExpansionPanel.Header>Controlled Panel</ExpansionPanel.Header>
              <ExpansionPanel.Body>├── Body</ExpansionPanel.Body>
            </ExpansionPanel>
          </Wrap>

          <Wrap>
            <Title>Uncontrolled</Title>
            <ExpansionPanel defaultExpanded={false}>
              <ExpansionPanel.Header>Click me!</ExpansionPanel.Header>
              <ExpansionPanel.Body>├── Body</ExpansionPanel.Body>
            </ExpansionPanel>
          </Wrap>

          <Wrap>
            <Title>Custom styling</Title>

            <ExpansionPanel
              className="text-black bg-white shadow overflow-hidden"
              defaultExpanded={false}
            >
              <ExpansionPanel.Header
                className="bg-gray-300 border-b py-3 px-4"
                expandIcon={<Icon name="chevron-down" />}
              >
                Click me!
              </ExpansionPanel.Header>
              <ExpansionPanel.Body className="py-3 px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </ExpansionPanel.Body>
            </ExpansionPanel>
          </Wrap>
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
