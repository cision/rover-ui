export const borderWidthBase = 1;
export const fontSizeBase = 14;
export const sizeBase = 8;

export const fontSizeMap = {
  sm: fontSizeBase * (12 / 14), // 12px
  md: fontSizeBase, // 14px
  h4: fontSizeBase * (16 / 14), // 16px
  h3: fontSizeBase * (24 / 14), // 24px
  h2: fontSizeBase * (32 / 14), // 32px
  h1: fontSizeBase * (40 / 14), // 40px
};

export const lineHeightMap = {
  sm: sizeBase * 2, // 16px
  md: sizeBase * 2.5, // 20px
};

export const spaceMap = {
  xs: sizeBase / 2, // 4px
  sm: sizeBase, // 8px
  md: sizeBase * 1.5, // 12px
  lg: sizeBase * 2, // 16px
  xl: sizeBase * 3, // 24px
  '2xl': sizeBase * 4, // 32px
  '3xl': sizeBase * 8, // 64px
  '4xl': sizeBase * 16, // 128px
};

// For backwards compatibility
export const fontSizes = Object.values(fontSizeMap);
// End backwards compatibility

export const sizing = {
  fontSizeMap,
  lineHeightMap,
  spaceMap,
};

export const subtractBorder = size => size - borderWidthBase;

export default sizing;
