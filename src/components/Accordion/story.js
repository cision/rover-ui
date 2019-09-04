import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { object, number } from '@storybook/addon-knobs';

import ExpansionPanel from '../ExpansionPanel';
import Icon from '../Icon';
import Accordion from './';
import Readme from './README.md';

storiesOf('Galaxies/Accordion', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Accordion
        style={object('style', {})}
        defaultExpandedPanel={number('defaultExpandedPanel', null)}
      >
        <ExpansionPanel>
          <ExpansionPanel.Header>Header 1</ExpansionPanel.Header>
          <ExpansionPanel.Body>├── Body 1</ExpansionPanel.Body>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanel.Header>Header 2</ExpansionPanel.Header>
          <ExpansionPanel.Body>├── Body 2</ExpansionPanel.Body>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanel.Header>Header 3</ExpansionPanel.Header>
          <ExpansionPanel.Body>├── Body 3</ExpansionPanel.Body>
        </ExpansionPanel>
      </Accordion>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Example',
    () => {
      const style = {
        color: '#000',
        backgroundColor: 'white',
        marginBottom: '20px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
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
          <h2>Default expanded panel</h2>
          <Accordion defaultExpandedPanel={0}>
            <ExpansionPanel>
              <ExpansionPanel.Header>Header 1</ExpansionPanel.Header>
              <ExpansionPanel.Body>├── Body 1</ExpansionPanel.Body>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanel.Header>Header 2</ExpansionPanel.Header>
              <ExpansionPanel.Body>├── Body 2</ExpansionPanel.Body>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanel.Header>Header 3</ExpansionPanel.Header>
              <ExpansionPanel.Body>├── Body 3</ExpansionPanel.Body>
            </ExpansionPanel>
          </Accordion>
          <h2>Custom styling</h2>
          <Accordion style={style}>
            <ExpansionPanel>
              <ExpansionPanel.Header
                expandIcon={<Icon name="chevron" />}
                style={headerStyle}
              >
                Header 1
              </ExpansionPanel.Header>
              <ExpansionPanel.Body style={bodyStyle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </ExpansionPanel.Body>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanel.Header
                expandIcon={<Icon name="chevron" />}
                style={headerStyle}
              >
                Header 2
              </ExpansionPanel.Header>
              <ExpansionPanel.Body style={bodyStyle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </ExpansionPanel.Body>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanel.Header
                expandIcon={<Icon name="chevron" />}
                style={headerStyle}
              >
                Header 3
              </ExpansionPanel.Header>
              <ExpansionPanel.Body style={bodyStyle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </ExpansionPanel.Body>
            </ExpansionPanel>
          </Accordion>
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
