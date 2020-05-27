import React from 'react';

const Addon: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <div {...props} />
);

Addon.displayName = 'PillAddon';

export default Addon;
