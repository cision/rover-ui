import styled from 'styled-components';
import { borderRadius, color, height, width } from 'styled-system';
import withDefaultTheme from '../withDefaultTheme';

const StyledContainer = withDefaultTheme(
  styled.div`
    box-sizing: border-box;
    display: flex;
    transition: width 1s ease;
    overflow: hidden;

    ${borderRadius}
    ${color}
    ${height}
    ${width}
  `
);

export default StyledContainer;
