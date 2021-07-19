---
to: src/components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
unless_exists: true
---
<% PascalName = h.changeCase.pascal(name) %>
import React from 'react';
import classNames from 'classnames';

import styles from './<%= PascalName %>.module.css';

interface <%= PascalName %>Props {
  className?: string;
}

const <%= PascalName %>: React.FC<<%= PascalName %>Props> = ({
  className = '',
  ...props
}) => {
  return (
    <div {...props} className={classNames(styles.<%= PascalName %>, className)}>
      Hello World, from <%= PascalName %>!
    </div>
  );
};

export default <%= PascalName %>;
