import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Input from '.';
import Readme from './README.md';

import { Wrap } from '../../stories/storybook-helpers';

interface InteractiveInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  InputRenderer: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
  fauxDisabled?: boolean;
}

const InteractiveInput: React.FC<InteractiveInputProps> = ({
  InputRenderer,
  checked: defaultChecked = undefined,
  value: defaultValue = undefined,
  ...passedProps
}) => {
  const [value, setValue] = useState(defaultValue);
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
      <Wrap>
        {/*
          Eslint doesn't recognise that the `InteractiveInput` wrappers are
          putting IDs on input elements, but they are.
        */}
        {/* eslint-disable jsx-a11y/label-has-associated-control */}
        <h2 className="text-2xl leading-snug">Input Examples</h2>
        <p className="mt-6">
          <small>
            <em>
              These are bare inputs - the labels are provided for documentation
              purposes only. &ldquo;Control&rdquo; components with integrated
              labels and validation messages are on the roadmap.
            </em>
          </small>
        </p>
        <p className="mt-6">
          <small>
            These examples use an `InteractiveInput` wrapper with an
            `InputRenderer` prop. In actual implementations, just use an `Input`
            component, `onChange`, and `value`/`checked` props instead.
          </small>
        </p>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="default">Default</label>
          <InteractiveInput
            className="w-full"
            id="default"
            InputRenderer={Input}
            placeholder="Type here"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="autofocus">Native autofocus attribute</label>
          <InteractiveInput
            autoFocus
            className="w-full"
            defaultValue="focus (using 'autoFocus')"
            id="autofocus"
            InputRenderer={Input}
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="invalid">
            Native pattern validation (digits only)
          </label>
          <InteractiveInput
            className="w-full"
            defaultValue="Invalid"
            id="invalid"
            InputRenderer={Input}
            pattern="\d+"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="disabled">Native disabled attribute</label>
          <InteractiveInput
            className="w-full"
            defaultValue="Disabled"
            disabled
            id="disabled"
            InputRenderer={Input}
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="fauxDisabled">Custom fauxDisabled prop</label>
          <InteractiveInput
            className="w-full"
            defaultValue="fauxDisabled"
            fauxDisabled
            id="fauxDisabled"
            InputRenderer={Input}
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="date">Native type=date</label>
          <InteractiveInput
            className="w-full"
            defaultValue="1967-03-01"
            id="date"
            InputRenderer={Input}
            type="date"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="month">Native type=month</label>
          <InteractiveInput
            className="w-full"
            defaultValue="1967-03"
            id="month"
            InputRenderer={Input}
            type="month"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="week">Native type=week</label>
          <InteractiveInput
            className="w-full"
            defaultValue="1967-W09"
            id="week"
            InputRenderer={Input}
            type="week"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="time">Native type=time</label>
          <InteractiveInput
            className="w-full"
            defaultValue="10:31"
            id="time"
            InputRenderer={Input}
            type="time"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="email">Native type=email</label>
          <InteractiveInput
            className="w-full"
            defaultValue="foo@bar.com"
            id="email"
            InputRenderer={Input}
            type="email"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="tel">Native type=tel</label>
          <InteractiveInput
            className="w-full"
            defaultValue="512-867-5309"
            id="tel"
            InputRenderer={Input}
            type="tel"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="range">Native type=range</label>
          <InteractiveInput
            className="w-full"
            defaultValue="70"
            id="range"
            InputRenderer={Input}
            max="100"
            step="10"
            type="range"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="color">Native type=color</label>
          <InteractiveInput
            className="w-full"
            defaultValue="#00CED1"
            id="color"
            InputRenderer={Input}
            type="color"
          />
        </div>
        <div className="w-full md:w-1/3 mt-6">
          <label htmlFor="checkbox">
            Native type=checkbox{' '}
            <InteractiveInput
              defaultChecked={false}
              id="checkbox"
              InputRenderer={Input}
              type="checkbox"
            />
          </label>
        </div>
        {/* eslint-enable jsx-a11y/label-has-associated-control */}
      </Wrap>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
