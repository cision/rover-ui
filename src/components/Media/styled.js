import styled from 'styled-components';
import { space, flexbox } from 'styled-system';
import withDefaultTheme from '../withDefaultTheme';

export const StyledMedia = withDefaultTheme(styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  ${flexbox}
  ${space}
`);

StyledMedia.defaultProps = {
  alignItems: 'stretch',
};

export const StyledBody = withDefaultTheme(styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  grid-template-columns: 100%;
  ${space}
`);

export const StyledItem = withDefaultTheme(styled.div`
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 100%;
  ${space}
`);
