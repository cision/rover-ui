import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { addParameters } from '@storybook/react'; // <- or your storybook framework
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../src/shared/theme.js';

addParameters({
  backgrounds: [
    { name: 'Light gray (default)', value: '#f6f8f8', default: true },
    { name: 'White', value: 'white' },
    { name: 'Black', value: 'black' },
  ],
});

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(story => (
  <ThemeProvider theme={defaultTheme}>{story()}</ThemeProvider>
));

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
