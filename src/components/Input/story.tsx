import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Input, { Checkbox } from '.';
import Readme from './README.md';

import { Wrap } from '../../stories/storybook-helpers';

interface InteractiveInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  InputRenderer: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
}

const InteractiveInput: React.FC<InteractiveInputProps> = ({
  InputRenderer,
  checked: defaultChecked = undefined,
  ...passedProps
}) => {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState<boolean | undefined>(defaultChecked);

  return (
    <InputRenderer
      {...passedProps}
      checked={checked !== undefined ? checked : undefined}
      onChange={(e) => {
        setValue(e.target.value);
        setChecked(e.target.checked);
      }}
      value={value !== undefined ? value : undefined}
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
      <>
        <Wrap>
          <h2 className="text-2xl leading-snug">Input Examples</h2>
          <div className="w-full md:w-1/3 mt-6">
            <InteractiveInput
              className="w-full"
              InputRenderer={Input}
              placeholder="Type here"
            />
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
          <div className="w-full md:w-1/3 mt-6">
            <InteractiveInput InputRenderer={Checkbox} />
          </div>
        </Wrap>
        <Wrap>
          <h3>Checkboxes</h3>
          <div style={{ display: 'flex', flexFlow: 'row' }}>
            <div className="mr-6 mb-6">
              <InteractiveInput InputRenderer={Checkbox} />
            </div>
            <div className="mr-6 mb-6">
              <InteractiveInput checked InputRenderer={Checkbox} />
            </div>
            <div className="mr-6 mb-6">
              <InteractiveInput disabled InputRenderer={Checkbox} />
            </div>
            <div className="mr-6 mb-6">
              <InteractiveInput checked disabled InputRenderer={Checkbox} />
            </div>
          </div>
        </Wrap>
      </>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
