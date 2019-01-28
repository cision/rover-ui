import styled from 'styled-components';
import {
  color,
  fontFamily,
  fontSize,
  marginLeft,
  marginRight,
} from 'styled-system';

import withDefaultTheme from '../withDefaultTheme';

const StyledBadge = styled.span`
  border-radius: 2px;
  display: inline-block;
  line-height: 1.5;
  padding: 0 0.5em;

  ${color}
  ${fontFamily}
  ${fontSize}
  ${marginLeft}
  ${marginRight}
`;

StyledBadge.defaultProps = {
  bg: null,
  color: 'river-bed',
  fontFamily: 'body',
  fontSize: 0,
  ml: 0,
  mr: 0,
};

StyledBadge.propTypes = {
  ...color.propTypes,
  ...fontFamily.propTypes,
  ...fontSize.propTypes,
  ...marginLeft.propTypes,
  ...marginRight.propTypes,
};

export default withDefaultTheme(StyledBadge);
