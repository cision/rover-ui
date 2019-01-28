import styled from 'styled-components';
import { boxShadow, borderRadius, color, space } from 'styled-system';
import withDefaultTheme from '../withDefaultTheme';

const StyledPaper = styled.div`
  box-sizing: border-box;
  ${boxShadow}
  ${borderRadius}
  ${color}
  ${space};
`;

StyledPaper.defaultProps = {
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
};

export default withDefaultTheme(StyledPaper);
