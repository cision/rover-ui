import styled, { withTheme } from 'styled-components';
import { backgroundColor, padding, marginBottom } from 'styled-system';

import defaultTheme from '../../shared/theme.js';

const Paper = styled.div`
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);

  ${backgroundColor}
  ${padding}
  ${marginBottom}
`;

Paper.displayName = 'Paper';

Paper.defaultProps = {
  theme: { ...defaultTheme },
  bg: 'white',
  mb: 3,
  p: 3,
};

export default withTheme(Paper);
