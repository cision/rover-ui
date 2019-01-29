const path = require("path");

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.css$/,
    loaders: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: true,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
        }
      }
    ],
    include: path.resolve(__dirname, "../")
  });

  return storybookBaseConfig;
};
