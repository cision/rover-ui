import colors from './colors';
import { fontSizes, spaceMap } from './sizing';

const fontFamilies = {
  heading: "'Source Sans Pro', sans-serif",
  body: "'Source Sans Pro', sans-serif",
  code: 'Roboto Mono, monospace',
};

const defaultTheme = {
  breakpoints: ['450px', '599px'],
  colors,
  fonts: fontFamilies,
  fontSizes,
  radii: [0, 2, 9999],
  space: spaceMap,
};

export default defaultTheme;
