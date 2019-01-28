import React from 'react';
import styled from 'styled-components';
import { space, flex } from 'styled-system';
import { propTypes as TagType } from '../../shared/models/tag';
import withDefaultTheme from '../withDefaultTheme';

const BaseMediaObj = ({ tag: Tag, ...props }) => <Tag {...props} />;
BaseMediaObj.propTypes = {
  tag: TagType,
};

BaseMediaObj.defaultProps = {
  tag: 'div',
};

export const StyledMedia = withDefaultTheme(styled(BaseMediaObj)`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  width: 100%;
  ${flex}
  ${space}
`);

export const StyledBody = withDefaultTheme(styled(BaseMediaObj)`
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  grid-template-columns: 100%;
  ${space}
`);

export const StyledItem = withDefaultTheme(styled(BaseMediaObj)`
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 100%;
  ${space}
`);
