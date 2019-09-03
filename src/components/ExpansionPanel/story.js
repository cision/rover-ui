import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Icon from '../Icon';
import ExpansionPanel from './';
import Readme from './README.md';

storiesOf('Galaxies/ExpansionPanel', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <ExpansionPanel
        expanded={boolean('expanded', false)}
        onToggle={action('onToggle')}
        collapseProps={object('collapseProps', { timeout: 200 })}
      >
        <ExpansionPanel.Header>Header</ExpansionPanel.Header>
        <ExpansionPanel.Body>├── Body</ExpansionPanel.Body>
      </ExpansionPanel>
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
      const style = {
        color: '#000',
        backgroundColor: 'white',
        marginBottom: '20px',
      };
      const headerStyle = {
        backgroundColor: '#edf1f2',
        borderBottom: '1px solid #c3cbcf',
        padding: '10px 15px',
      };
      const bodyStyle = {
        padding: '10px 15px',
      };

      return (
        <Fragment>
          <h2>Controlled</h2>
          <ExpansionPanel expanded={boolean('expanded', false)}>
            <ExpansionPanel.Header>Controlled Panel</ExpansionPanel.Header>
            <ExpansionPanel.Body>├── Body</ExpansionPanel.Body>
          </ExpansionPanel>
          <h2>Uncontrolled</h2>
          <ExpansionPanel defaultExpanded={false}>
            <ExpansionPanel.Header>Click me!</ExpansionPanel.Header>
            <ExpansionPanel.Body>├── Body</ExpansionPanel.Body>
          </ExpansionPanel>
          <h2>Custom styling</h2>
          <ExpansionPanel defaultExpanded={false} style={style}>
            <ExpansionPanel.Header
              expandIcon={<Icon name="chevron" />}
              style={headerStyle}
            >
              Click me!
            </ExpansionPanel.Header>
            <ExpansionPanel.Body style={bodyStyle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ExpansionPanel.Body>
          </ExpansionPanel>
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
