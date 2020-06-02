import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Input from './';
import Readme from './README.md';

const InteractiveInput = (props) => {
  const [value, setValue] = useState('');

  return (
    <Input
      {...props}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

storiesOf('Planets/Input', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Input
        className="m-8"
        disabled={boolean('disabled (HTML)', false)}
        fauxDisabled={boolean('fauxDisabled', false)}
        onChange={action('onChange (HTML)')}
        placeholder={text('placeholder(HTML)', 'Placeholder')}
        value={text('value (HTML)', '')}
        pattern={text('pattern (HTML)', '.*')}
        type={text('type (HTML)', '')}
      />
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Examples',
    () => (
      <div className="m-8">
        <InteractiveInput placeholder="Type here" />
        <br />
        <br />
        <Input disabled value="Disabled" />
        <br />
        <br />
        <Input pattern="" value="Invalid" />
      </div>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
