import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import { Title, Wrap } from '../../stories/storybook-helpers';

import InputTime from '.';
import Readme from './README.md';

const InteractiveInputTime = ({
  onChange,
  value: initValue,
  ...passedProps
}) => {
  const [value, setValue] = useState(initValue);

  return (
    <InputTime
      {...passedProps}
      onChange={(e) => {
        setValue(e.target.value);
        if (onChange) {
          onChange(e);
        }
      }}
      value={value}
    />
  );
};

storiesOf('Planets/InputTime', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <InputTime
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
    'Example',
    () => (
      <Wrap>
        <Title>With string times for max, min, and value</Title>
        <InteractiveInputTime
          max={text('max', '20:00')}
          min={text('min', '10:00')}
          onChange={action('onChange string')}
          value={`${new Date().getHours()}:${new Date().getMinutes()}`}
        />
      </Wrap>
    ),
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
