const path = require('path');

module.exports = {
  addons: [
    'storybook-readme/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-links/register',
    '@storybook/addon-backgrounds/register',
    '@storybook/preset-typescript',
  ],
  webpackFinal: (config) => {
    config.module.rules = config.module.rules.map((f) => {
      // Needed to add this to ignore our ../src/ for the default rule, instead of purging it.
      if (f.test.toString() === '/\\.css$/') {
        f.exclude = path.resolve(__dirname, '../src/');
      }

      return f;
    });

    config.module.rules.push({
      test: /\.css$/,
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            context: __dirname,
            importLoaders: 1,
            localIdentName: '[local]--[contenthash:base64:5]',
            minimize: true,
            modules: true,
            sourceMap: true,
          },
        },
      ],
      include: path.resolve(__dirname, '../src/'),
    });

    return config;
  },
};
