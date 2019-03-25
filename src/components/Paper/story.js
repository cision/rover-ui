import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

import Paper from '../Paper';

const paddingLabel = 'Padding';
const paddingOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
const paddingDefaultValue = 'md';
const defaultTag = 'h1';

const divStyle = {
  marginBottom: '10px',
  padding: '10px',
};

storiesOf('Planets/Paper', module)
  .add(
    'Overview',
    () => {
      const Tag = text('Tag', defaultTag);
      const padding = select(paddingLabel, paddingOptions, paddingDefaultValue);

      return (
        <div style={divStyle}>
          <Paper padding={padding} dark={boolean('Dark mode', false)}>
            <Tag>{text('Children', 'My Paper')}</Tag>
          </Paper>
        </div>
      );
    },
    {
      info: {
        text: `
              Paper provides a nice clean wrapper to separate pieces of content.

              ### Light/Dark

              By default, \`<Paper />\` components are white with normal text.
              If you want to invert the colors, pass a \`dark\` parameter.

              ~~~js
              <Paper>
                // any children
              </Paper>

              // for dark background and white text
              <Paper dark>
                // any children
              </Paper>
              ~~~

              ### Padding

              The padding size is controlled by the \`padding\` prop. There are 5 options:

              * \`xs\`
              * \`sm\`
              * \`md\`
              * \`lg\`
              * \`xl\`
              * \`none\`

              **Note**

              If you need custom padding within the component, you will need to use a child
              component so we can be confident in our Paper sizing. For this you can use the
              \`none\` padding value with custom padding within.

              ~~~js
              <Paper padding='none'>
                <div style={{ padding: '20px 10px' }}>
                  // moar children
                </div>
              </Paper>
              ~~~
              `,
      },
    }
  )
  .add('Examples', () => {
    return (
      <div>
        <div style={divStyle}>
          <Paper>
            <code>{'<Paper />'}</code>
          </Paper>
        </div>
        <div style={divStyle}>
          <Paper dark>
            <code>{'<Paper dark />'}</code>
          </Paper>
        </div>
        <div style={divStyle}>
          <Paper padding="xs">
            <code>{'<Paper padding="xs" />'}</code>
          </Paper>
        </div>
        <div style={divStyle}>
          <Paper padding="sm">
            <code>{'<Paper padding="sm" />'}</code>
          </Paper>
        </div>
        <div style={divStyle}>
          <Paper padding="md">
            <code>{'<Paper padding="md" />'}</code>
          </Paper>
        </div>
        <div style={divStyle}>
          <Paper padding="lg">
            <code>{'<Paper padding="lg" />'}</code>
          </Paper>
        </div>
        <div style={divStyle}>
          <Paper padding="xl">
            <code>{'<Paper padding="xl" />'}</code>
          </Paper>
        </div>
      </div>
    );
  });
