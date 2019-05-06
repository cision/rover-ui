const colors = {
  white: '#fff',
  black: '#000',
  blue: '#3398db',
  blues: ['#50a7e0', '#e8f8fc'],
  green: '#63bf52',
  greens: ['#69cc58', '#e9fcf6'],
  teal: '#44c0c2',
  teals: ['#47cacc'],
  salmon: '#f76764',
  salmons: ['#feebea'],
  hotPink: '#e62e5f',
  hotPinks: ['tint($notifycolorbase, 10%)', 'tint($notifycolorbase, 50%)'],
  yellow: '#f8ca00',
  yellows: ['#fef8d3'],
  gray: '#414c52',
  grays: ['#58666e', '#8a99a2', '#c3cbcf', '#dee5e7', '#edf1f2', '#f6f8f8'],
};

colors.brandColor = colors.blue;
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
  space: [0, 4, 8, 16, 32, 64, 128],
  colors,
  fontSizes,
  fonts: fontFamilies,
};

export default defaultTheme;
