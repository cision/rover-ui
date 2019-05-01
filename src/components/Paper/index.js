import styled from 'styled-components';
import { backgroundColor, padding, marginBottom } from 'styled-system';

const Paper = styled.div`
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);

  ${backgroundColor}
  ${padding}
  ${marginBottom}
`;

Paper.displayName = 'Paper';

Paper.defaultProps = {
  bg: 'white',
  mb: 3,
  p: '20px',
};

export default Paper;
