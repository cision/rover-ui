const BrandColor = '#3398db';

const colors = {
  white: '#fff',
  black: '#000',
  brandColor: BrandColor,
  blue: BrandColor,
  blueLite: ['#50a7e0', '#e8f8fc'],
  green: '#63bf52',
  greenLite: ['#69cc58', '#e9fcf6'],
  teal: '#44c0c2',
  tealLite: ['#47cacc'],
  salmon: '#f76764',
  salmonLite: ['#feebea'],
  hotPink: '#e62e5f',
  hotPinkLite: ['tint($notifycolorbase, 10%)', 'tint($notifycolorbase, 50%)'],
  yellow: '#f8ca00',
  yellowLite: ['#fef8d3'],
  gray: '#414c52',
  grayLite: ['#58666e', '#8a99a2', '#c3cbcf', '#dee5e7', '#edf1f2', '#f6f8f8'],
};

colors.danger = colors.salmon;
colors.notify = colors.hotPink;
colors.info = colors.blue;
colors.success = colors.green;
colors.warning = colors.yellow;

const fontFamilies = {
  heading: "'Source Sans Pro', sans-serif",
  body: "'Source Sans Pro', sans-serif",
  code: 'Roboto Mono, monospace',
};

const fontSizes = [12, 14, 18, 25, 30];

const defaultTheme = {
  breakpoints: ['450px', '599px'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors,
  fontSizes,
  fonts: fontFamilies,
};

export default defaultTheme;
