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

const theme = {
  breakpoints: ['450px', '599px'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors,
  fontSizes,
  fonts: fontFamilies,
  textStyles: {
    headline: {
      fontSize: [11, 12, 14],
      fontWeight: 800,
      lineHeight: [1],
      textTransform: 'uppercase',
      fontFamily: fontFamilies.heading,
    },
    trafalgar: {
      tag: 'h1',
      fontSize: [6, 9, 12],
      lineHeight: ['24px', '28px', '40px'],
      fontWeight: 500,
      fontFamily: fontFamilies.heading,
    },
    paragon: {
      tag: 'h2',
      fontSize: [6, 8, 11],
      fontWeight: 500,
      fontFamily: fontFamilies.heading,
      lineHeight: ['20px', '26px', '32px'],
    },
    doublePica: {
      fontSize: [6, 6, 10],
      fontWeight: 400,
      fontFamily: fontFamilies.heading,
      lineHeight: ['24px', '24px', '30px'],
    },
    greatPrimer: {
      tag: 'h3',
      fontWeight: 400,
      fontSize: [5, 5, 7],
      fontFamily: fontFamilies.heading,
      lineHeight: ['22px', '22px', '24px'],
    },
    bodyCopy: {
      fontSize: [3, 4, 5],
      fontFamily: fontFamilies.body,
      lineHeight: ['20px', '22px', '24px'],
    },
    code: {
      px: '4px',
      py: '2px',
      lineHeight: '22px',
      borderRadius: 4,
      fontFamily: fontFamilies.code,
    },
    underline: {
      textDecoration: 'underline',
    },
  },
};

export default theme;
