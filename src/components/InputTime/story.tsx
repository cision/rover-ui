import React, { useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, date, text } from '@storybook/addon-knobs';

import { Title, Wrap } from '../../stories/storybook-helpers';

import { getShortTimeString } from './utils';
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
    () => {
      const now = new Date();
      const valueDate = now;
      const valueString = getShortTimeString(now.getHours(), now.getMinutes());

      const defaultMaxDate = useMemo(() => {
        const d = new Date();
        d.setHours(20);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
      }, []);

      const defaultMinDate = useMemo(() => {
        const d = new Date();
        d.setHours(10);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
      }, []);

      const maxDate = new Date(date('max (Date)', defaultMaxDate));
      const minDate = new Date(date('min (Date)', defaultMinDate));

      return (
        <>
          <Wrap>
            <Title>With string times for max, min, and value</Title>
            <InteractiveInputTime
              max={text('max', '20:00')}
              min={text('min', '10:00')}
              onChange={action('onChange string')}
              value={valueString}
            />
          </Wrap>
          <Wrap>
            <Title>With Date times for max, min, and value</Title>
            <InteractiveInputTime
              max={maxDate}
              min={minDate}
              onChange={action('onChange date')}
              value={valueDate}
            />
          </Wrap>
          <Wrap>
            <Title>Without `showDropdown`</Title>
            <InteractiveInputTime
              max={maxDate}
              min={minDate}
              onChange={action('onChange date')}
              showDropdown="false"
              value={valueDate}
            />
          </Wrap>
        </>
      );
    },
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
