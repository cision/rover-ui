import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './index';

// addDecorator(withInfo);

storiesOf('Planets/Button', module)
  .addParameters({
    info: {
      inline: true,
    },
  })
  .add(
    'with text',
    () => <Button onClick={action('clicked')}>Hello Button</Button>,
    {
      info: {
        text: `
              Here's some custom information about my component

              ~~~js
              <Button>Click Here</Button>
              ~~~

              As you can see, it supports markdown
            `,
      },
    })
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
