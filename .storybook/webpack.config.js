const path = require('path');

module.exports = async ({ config, mode }) => {
  const prevCssLoaderRule = config.module.rules.find(
    r => r.test.toString() === '/\\.css$/'
  );

  const nextCssLoaderRule = {
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
    include: path.resolve(__dirname, '../'),
  };

  if (config.module.rules.indexOf(prevCssLoaderRule) >= 0) {
    config.module.rules.splice(
      config.module.rules.indexOf(prevCssLoaderRule),
      1,
      nextCssLoaderRule
    );
  } else {
    config.module.rules.push(nextCssLoaderRule);
  }

  return config;
};
