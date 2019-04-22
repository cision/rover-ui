import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

import Badge from '../Badge';

const divStyle = {
  marginBottom: '10px',
  padding: '20px',
};
const darkStyle = {
  ...divStyle,
  backgroundColor: '#414c52',
};

storiesOf('Planets/Badge', module)
  .add(
    'Overview',
    () => {
      const colorOptions = [
        '',
        'danger',
        'notify',
        'warning',
        'info',
        'success',
      ];

      return (
        <Badge
          color={select('color', colorOptions, '')}
          darkMode={boolean('dark mode', false)}
        >
          {text('Children', 'My Badge')}
        </Badge>
      );
    },
    {
      info: {
        inline: true,
        text: `
              #### Badges are used for additional information

              The badge background color is controled by the \`color\` prop.
              Any of the semantic colors can be overridden by \`darkMode = true\`.
              Color is optional, will default to very light gray background.

              **Valid Colors:**
              * dark
              * light
              * danger
              * notify
              * warning
              * info
              * success


              If you are trying to have spacing around or between badges lined up next to each other, it must be controlled by a parent div like so:

              ~~~js
              const badgeWrapStyle = { marginRight: '10px' };

              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <div style={badgeWrapStyle}>
                  <Badge color="info">Print</Badge>
                </div>
                <div style={badgeWrapStyle}>
                  <Badge color="info">Broadcast</Badge>
                </div>
                <div style={badgeWrapStyle}>
                  <Badge color="info">Radio</Badge>
                </div>
              </div>
              ~~~
            `,
      },
    }
  )
  .add('Examples', () => {
    return (
      <div>
        <div style={divStyle}>
          <Badge>My Badge</Badge>
        </div>
        <div style={darkStyle}>
          <Badge darkMode>Dark Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge color="danger">Danger Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge color="notify">Notify Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge color="info">Info Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge color="warning">Warning Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge color="success">Success Badge</Badge>
        </div>
        <div style={{ ...divStyle, display: 'flex', alignItems: 'baseline' }}>
          <div style={{ marginRight: '10px' }}>
            <Badge color="info">Print</Badge>
          </div>
          <div style={{ marginRight: '10px' }}>
            <Badge color="info">Broadcast</Badge>
          </div>
          <div style={{ marginRight: '10px' }}>
            <Badge color="info">Radio</Badge>
          </div>
          <span>Article</span>
        </div>
        <div style={{ ...divStyle, display: 'flex', alignItems: 'baseline' }}>
          <span>Article</span>
          <div style={{ marginLeft: '10px' }}>
            <Badge color="info">Print</Badge>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <Badge color="info">Broadcast</Badge>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <Badge color="info">Radio</Badge>
          </div>
        </div>
      </div>
    );
  });
