import React from 'react';
import { borderRadius, color, space } from 'styled-system';

import StyledPaper from './styled.js';

const Paper = props => <StyledPaper {...props} />;

Paper.defaultProps = {
  bg: 'white',
  borderRadius: '2px',
  color: 'gray',
  p: 'lg',
  m: 0,
};

Paper.propTypes = {
  ...borderRadius.propTypes,
  ...color.propTypes,
  ...space.propTypes,
};

export default Paper;
