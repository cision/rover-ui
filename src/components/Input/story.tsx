import React, { useState, InputHTMLAttributes } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Input from '.';
import Readme from './README.md';

import { Wrap } from '../../stories/storybook-helpers';

const InteractiveInput: React.FC<React.InputHTMLAttributes<
  HTMLInputElement
>> = (props) => {
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
      <Wrap>
        <label className="text-xl inline-block mb-2">{`<Input />`}</label>
        <Input
          disabled={boolean('disabled (HTML)', false)}
          fauxDisabled={boolean('fauxDisabled', false)}
          onChange={action('onChange (HTML)')}
          className={text('className (HTML)', 'w-full')}
          placeholder={text('placeholder(HTML)', 'Placeholder')}
          value={text('value (HTML)', '')}
          pattern={text('pattern (HTML)', '.*')}
          type={text('type (HTML)', '')}
        />
      </Wrap>
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
      <Wrap>
        <h2 className="text-2xl leading-snug">Basic Input Examples</h2>
        <div className="w-full md:w-1/3 mt-6">
          <InteractiveInput className="w-full" placeholder="Type here" />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input
            className="w-full"
            autoFocus
            value="focus (using 'autoFocus')"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" pattern="\d+" value="Invalid" />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" disabled value="Disabled" />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" fauxDisabled value="fauxDisabled" />
        </div>
      </Wrap>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
