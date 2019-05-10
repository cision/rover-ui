import React from 'react';

import StyledBar from './styled.js';

export const Bar = props => (
  <StyledBar
    bg="porcelain"
    borderRadius={2}
    height="10px"
    width="100%"
    {...props}
  />
);

export const Fill = props => (
  <StyledBar bg="regent-gray" borderRadius={0} height="100%" {...props} />
);

const BarStat = {
  Bar,
  Fill,
};

export default BarStat;
