import React, { useState } from 'react';
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
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="text-xl inline-block mb-2">
          {`<Input />`}
          <Input
            id="SampleInput"
            className={text('className (HTML)', 'w-full')}
            onChange={action('onChange (HTML)')}
            fauxDisabled={boolean('fauxDisabled', false)}
          />
        </label>
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
        <h2 className="text-2xl leading-snug">Input Examples</h2>
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
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" type="date" value="1967-03-01" />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" type="month" value="1967-03" />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" type="week" value="1967-W09" />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" type="time" value="10:31" />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" type="email" value="foo@bar.com" />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" type="tel" value="512-867-5309" />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input
            className="w-full"
            type="range"
            max="100"
            value="70"
            step="10"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <Input className="w-full" type="color" value="#00CED1" />
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
