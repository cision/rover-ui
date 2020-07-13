import React, { useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import { Title, Wrap } from '../../stories/storybook-helpers';

import Button from '../Button';
import { getShortTimeString } from './utils';
import InputTime from '.';
import Readme from './README.md';

const showDropdownOptions = {
  click: 'click' as const,
  none: 'none' as const,
  undefined,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
interface InteractiveInputProps {
  Component: React.FC<{ [key: string]: any }>;
  onChange?: Function;
  value: string;
  [key: string]: any;
}

const InteractiveInput: React.FC<InteractiveInputProps> = ({
  Component,
  onChange,
  value: initValue,
  ...passedProps
}) => {
  const [value, setValue] = useState(initValue);

  return (
    <Component
      {...passedProps}
      onChange={(e: any) => {
        setValue(e.target.value);
        if (onChange) {
          onChange(e);
        }
      }}
      value={value}
    />
  );
};
/* eslint-enable @typescript-eslint/no-explicit-any */

storiesOf('Planets/InputTime', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const useDates = boolean('Use ISO dates? (implicit)', true, 'Common');

      const defaultMaxDate = useMemo(() => {
        const d = new Date();
        d.setHours(20);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      const defaultMinDate = useMemo(() => {
        const d = new Date();
        d.setHours(10);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      const defaultValueDate = useMemo(() => {
        const d = new Date();
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      const maxDateString = text('max', defaultMaxDate, 'Using dates');
      const minDateString = text('min', defaultMinDate, 'Using dates');
      const valueDateString = text('value', defaultValueDate, 'Using dates');
      const maxString = text('max', '20:00', 'Using times');
      const minString = text('min', '10:00', 'Using times');
      const valueString = text('value', '', 'Using times');

      return (
        <InputTime
          className="m-8"
          disabled={boolean('disabled (HTML)', false, 'Common')}
          fauxDisabled={boolean('fauxDisabled', false, 'Common')}
          onChange={action('onChange (HTML)')}
          placeholder={text('placeholder(HTML)', 'Placeholder', 'Common')}
          max={useDates ? maxDateString : maxString}
          min={useDates ? minDateString : minString}
          showDropdown={select(
            'showDropdown',
            showDropdownOptions,
            'click',
            'Common'
          )}
          step={number(
            'step (seconds)',
            60 * 60,
            { min: 60, max: 60 * 60 },
            'Common'
          )}
          value={useDates ? valueDateString : valueString}
        />
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  )
  .add(
    'Examples',
    () => {
      const defaultMaxDate = useMemo(() => {
        const d = new Date();
        d.setHours(20);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      const defaultMinDate = useMemo(() => {
        const d = new Date();
        d.setHours(10);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      const ref = React.createRef<HTMLInputElement>();

      const step = number(
        'step (seconds)',
        60 * 60,
        { min: 60, max: 60 * 60 },
        'Common'
      );

      const startOfNextHour = new Date();
      startOfNextHour.setHours(startOfNextHour.getHours() + 1);
      startOfNextHour.setMinutes(0);
      startOfNextHour.setSeconds(0);
      startOfNextHour.setMilliseconds(0);

      return (
        <>
          <Wrap>
            <Title>With string times for max, min, and value</Title>
            <InteractiveInput
              Component={InputTime}
              max={text('max', '20:00', 'Using times')}
              min={text('min', '10:00', 'Using times')}
              onChange={action('onChange string')}
              step={step}
              value={getShortTimeString(
                new Date().getHours(),
                new Date().getMinutes()
              )}
            />
          </Wrap>
          <Wrap>
            <Title>With Date times for max, min, and value</Title>
            <InteractiveInput
              Component={InputTime}
              max={text('max', defaultMaxDate, 'Using dates')}
              min={text('min', defaultMinDate, 'Using dates')}
              onChange={action('onChange date')}
              step={step}
              value={new Date().toISOString()}
            />
          </Wrap>
          <Wrap>
            <Title>Requires you to pick a future date time</Title>
            <InteractiveInput
              Component={InputTime}
              min={startOfNextHour.toISOString()}
              onChange={action('onChange date')}
              step={3600}
              value={new Date().toISOString()}
            />
          </Wrap>
          <Wrap>
            <Title>Without the dropdown time selector</Title>
            <InteractiveInput
              Component={InputTime}
              onChange={action('onChange string')}
              showDropdown="none"
              step={step}
              value={getShortTimeString(
                new Date().getHours(),
                new Date().getMinutes()
              )}
            />
          </Wrap>
          <Wrap>
            <Title>Using a `ref` to control focus</Title>
            <InputTime ref={ref} value={new Date().toISOString()} />{' '}
            <Button
              onClick={() => {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                (ref.current as any)?.focus();
              }}
            >
              Focus!
            </Button>
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
