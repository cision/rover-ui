const colors = {
  black: '#000',
  blue: '#3398db',
  blueTints: ['#50a7e0', '#e8f8fc'],
  gray: '#414c52',
  green: '#63bf52',
  greenTints: ['#69cc58', '#e9fcf6'],
  geyser: '#dee5e7',
  hotPink: '#e62e5f',
  hotPinkTints: ['#eb5c82', '#fce4ea'],
  loblolly: '#c3cbcf',
  porcelain: '#edf1f2',
  'regent-gray': '#8a99a2',
  'river-bed': '#4a5864',
  salmon: '#f76764',
  salmonTints: ['#f99794', '#feebea'],
  'shuttle-gray': '#58666e',
  teal: '#44c0c2',
  tealTints: ['#47cacc', '#b7e7e8'],
  white: '#fff',
  whiteSmoke: '#f6f8f8',
  yellow: '#f8ca00',
  yellowTints: ['#ffd82c', '#fef8d3'],
};

colors.grayTints = [
  colors['river-bed'],
  colors['shuttle-gray'],
  colors['regent-gray'],
  colors.loblolly,
  colors.geyser,
  colors.porcelain,
  colors.whiteSmoke,
];

colors.brandColor = colors.blue;
colors.danger = colors.salmon;
colors.notify = colors.hotPink;
colors.info = colors.blue;
colors.success = colors.green;
colors.warning = colors.yellow;

// aliases for backwards compatibility
colors.blues = colors.blueTints;
colors.greens = colors.greenTints;
colors.hotPinks = colors.hotPinkTints;
colors.salmons = colors.salmonTints;
colors.teals = colors.tealTints;
colors.yellows = colors.yellowTints;
colors.grays = [colors.gray, ...colors.grayTints];

export default colors;
