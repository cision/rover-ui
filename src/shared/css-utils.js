export const parseCssSize = ({ size }) => {
  if (typeof size === 'number') {
    return { size, unit: 'px' }; // Gutter is a number of pixels
  }

  let parsedSize;

  try {
    parsedSize = parseInt(size, 10);

    if (isNaN(parsedSize)) {
      throw new Error("That's not a number");
    }
  } catch (e) {
    return { size: 0, unit: 'px' };
  }

  const unit = size.replace(parsedSize, '') || 'px';

  return { size: parsedSize, unit };
};

const cssUtils = {
  parseCssSize,
};

export default cssUtils;
