module.exports = {
  plugins: [
    require('postcss-custom-properties')({
      preserve: false,
      importFrom: [
        'src/shared/colors.css',
        'src/shared/buttons.css',
        'src/shared/sizing.css',
        'src/shared/variables.css',
      ],
    }),
    require('postcss-calc'),
    require('cssnano')({
      presets: 'default',
    }),
  ],
};
