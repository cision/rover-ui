import { storiesOf } from '@storybook/react';
import roverUiReadme from './ROVER_UI.md';
import darkMatterReadme from './DARK_MATTER.md';
import responsivenessReadme from './RESPONSIVENESS.md';
import changelog from '../../CHANGELOG.md';

storiesOf('/RoverUI', module)
  .add('Introduction', () => null, {
    options: {
      showPanel: false,
    },
    info: {
      inline: true,
      source: false,
      text: roverUiReadme || ``,
    },
  })
  .add('Layout (Dark matter)', () => null, {
    options: {
      showPanel: false,
    },
    info: {
      inline: true,
      source: false,
      text: darkMatterReadme || ``,
    },
  })
  .add('Responsiveness', () => null, {
    options: {
      showPanel: false,
    },
    info: {
      inline: true,
      source: false,
      text: responsivenessReadme || ``,
    },
  })
  .add('Changelog', () => null, {
    options: {
      showPanel: false,
    },
    info: {
      inline: true,
      source: false,
      text: changelog || ``,
    },
  });
