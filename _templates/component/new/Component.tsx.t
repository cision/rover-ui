---
to: src/components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
unless_exists: true
---
<% PascalName = h.changeCase.pascal(name) %>
import React from 'react';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

import styles from './<%= PascalName %>.css';

interface <%= PascalName %>Props {
  className?: ClassValue;
}

const <%= PascalName %>: React.FC<<%= PascalName %>Props> = ({
  className: klassName = '',
  ...props
}) => {
  const className = classNames(styles.<%= PascalName %>, klassName);

  return (
    <div {...props} className={className}>
      Hello World, from <%= PascalName %>!
    </div>
  );
};

export default <%= PascalName %>;
