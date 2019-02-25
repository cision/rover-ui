import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';

import Badge from '../Badge';

storiesOf('Planets/Badge', module)
  .add(
    'Overview',
    () => {
      const modifierOptions = [
        'dark',
        'light',
        'danger',
        'notify',
        'warning',
        'info',
        'success',
        'right',
        'left',
      ];

      return (
        <Badge modifiers={[select('modifier', modifierOptions, 'info')]}>
          {text('Children', 'My Badge')}
        </Badge>
      );
    }, {
      info: {
        text: `
              #### Badges are used for additional information

              The color type modifiers should not be used together, but any can be combined with the "right" or "left" modifier

              **Valid Modifiers:**
              * dark
              * light
              * danger
              * notify
              * warning
              * info
              * success
              * right (puts 10px margin on left side)
              * left (puts 10px margin on right side)
            `,
      },
    }
  )
  .add('Examples', () => {
    const divStyle = {
      marginBottom: '10px',
      padding: '20px',
    };
    const darkStyle = {
      ...divStyle,
      backgroundColor: '#414c52',
    };
    return (
      <div>
        <div style={divStyle}>
          <Badge>My Badge</Badge>
        </div>
        <div style={darkStyle}>
          <Badge modifiers={['dark']}>Dark Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge modifiers={['danger']}>Danger Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge modifiers={['notify']}>Notify Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge modifiers={['info']}>Info Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge modifiers={['warning']}>Warning Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge modifiers={['success']}>Success Badge</Badge>
        </div>
        <div style={divStyle}>
          <Badge modifiers={['left']}>Left Badge</Badge>
          <Badge modifiers={['left']}>Left Badge</Badge>
          <Badge modifiers={['left']}>Left Badge</Badge>
          <span role="img" aria-label="smiley">
            😁
          </span>
        </div>
        <div style={divStyle}>
          <span role="img" aria-label="smiley">
            😁
          </span>
          <Badge modifiers={['right']}>Right Badge</Badge>
          <Badge modifiers={['right']}>Right Badge</Badge>
          <Badge modifiers={['right']}>Right Badge</Badge>
        </div>
      </div>
    );
  });
