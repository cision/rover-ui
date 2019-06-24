import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';
import { propTypes as TagType } from '../../shared/models/tag';
import withDefaultTheme from '../withDefaultTheme';

const BaseMediaObj = ({ tag: Tag, ...props }) => <Tag {...props} />;
BaseMediaObj.propTypes = {
  tag: TagType,
};

BaseMediaObj.defaultProps = {
  tag: 'div',
};

const StyledMedia = styled(BaseMediaObj)`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  width: 100%;
  ${space}
`;

StyledMedia.displayName = 'Media';
const Media = withDefaultTheme(StyledMedia);

const StyledBody = styled(BaseMediaObj)`
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  grid-template-columns: 100%;
  ${space}
`;
StyledBody.displayName = 'Media.Body';
const Body = withDefaultTheme(StyledBody);

const StyledItem = styled(BaseMediaObj)`
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 100%;
  ${space}
`;
StyledItem.displayName = 'Media.Item';
const Item = withDefaultTheme(StyledItem);

Media.Body = Body;
Media.Item = Item;

export default Media;
