import React from 'react';

import StyledBar from './styled.js';

export const Wrapper = props => (
  <StyledBar
    bg="porcelain"
    borderRadius={2}
    height="10px"
    overflow="hidden"
    width="100%"
    {...props}
  />
);

export const Fill = props => (
  <StyledBar bg="regent-gray" borderRadius={0} height="10px" {...props} />
);

const BarStat = {
  Wrapper,
  Fill,
};

export default BarStat;
