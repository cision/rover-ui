import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { addParameters } from '@storybook/react';
import { addReadme } from 'storybook-readme';

addDecorator(
  withInfo({
    header: false,
    inline: true,
  })
);
addDecorator(addReadme);

addParameters({
  backgrounds: [
    { name: 'Light gray (default)', value: '#f6f8f8', default: true },
    { name: 'White', value: 'white' },
    { name: 'Black', value: 'black' },
  ],
  options: {
    panelPosition: 'right',
  },
});

addDecorator(withKnobs);

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
