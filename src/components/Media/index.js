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

const Media = withDefaultTheme(StyledMedia);
Media.displayName = 'Media';

const StyledBody = styled(BaseMediaObj)`
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  grid-template-columns: 100%;
  ${space}
`;
const Body = withDefaultTheme(StyledBody);
Body.displayName = 'Media.Body';

const StyledItem = styled(BaseMediaObj)`
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 100%;
  ${space}
`;
const Item = withDefaultTheme(StyledItem);
Item.displayName = 'Media.Item';

Media.Body = Body;
Media.Item = Item;

export default Media;
