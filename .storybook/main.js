const path = require('path');

module.exports = {
  addons: [
    'storybook-readme/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-links/register',
    '@storybook/addon-backgrounds/register',
    '@storybook/preset-create-react-app',
  ],
};
