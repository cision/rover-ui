const colors = {
  black: '#000',
  blue: '#3398db',
  blues: ['#50a7e0', '#e8f8fc'],
  gray: '#414c52',
  green: '#63bf52',
  greens: ['#69cc58', '#e9fcf6'],
  geyser: '#dee5e7',
  hotPink: '#e62e5f',
  hotPinks: ['tint($notifycolorbase, 10%)', 'tint($notifycolorbase, 50%)'],
  loblolly: '#c3cbcf',
  porcelain: '#edf1f2',
  'regent-gray': '#8a99a2',
  'river-bed': '#4a5864',
  salmon: '#f76764',
  salmons: ['#feebea'],
  'shuttle-gray': '#58666e',
  teal: '#44c0c2',
  teals: ['#47cacc'],
  white: '#fff',
  yellow: '#f8ca00',
  yellows: ['#fef8d3'],
};

colors.grays = [
  colors.gray,
  colors['river-bed'],
  colors['shuttle-gray'],
  colors['regent-gray'],
  colors.loblolly,
  colors.geyser,
  colors.porcelain,
  '#f6f8f8',
];

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
  radii: [0, 2, 9999],
  colors,
  fontSizes,
  fonts: fontFamilies,
};

export default defaultTheme;
