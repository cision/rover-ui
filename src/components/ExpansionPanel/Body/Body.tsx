import React from 'react';

const Body: React.FC<React.AllHTMLAttributes<HTMLDivElement>> = (props) => (
  <div {...props} />
);

Body.displayName = 'ExpansionPanel.Body';

export default Body;
