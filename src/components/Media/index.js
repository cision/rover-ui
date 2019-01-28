import { StyledMedia, StyledBody, StyledItem } from './styled.js';

const Media = StyledMedia;
Media.displayName = 'Media';

const Body = StyledBody;
Body.displayName = 'Media.Body';

const Item = StyledItem;
Item.displayName = 'Media.Item';

Media.Body = Body;
Media.Item = Item;

export default Media;
