import styled from 'styled-components';
import { borderRadius, color, overflow, height, width } from 'styled-system';
import withDefaultTheme from '../withDefaultTheme';

const StyledContainer = withDefaultTheme(
  styled.div`
    box-sizing: border-box;
    display: flex;
    transition: width 1s ease;

    ${borderRadius}
    ${color}
    ${height}
    ${overflow}
    ${width}
  `
);

export default StyledContainer;
