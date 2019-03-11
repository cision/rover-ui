import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';

addDecorator(
  withInfo({
    header: true,
    inline: true,
    source: false,
  })
);

addDecorator(withKnobs);

addDecorator(checkA11y);

addDecorator(
  withOptions({
    hierarchySeparator: '/',
  })
);

configure(() => require('../src/stories'), module);
