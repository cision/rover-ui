import React, { useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number, object, select, text } from '@storybook/addon-knobs';

import { Spacer, Title, Wrap } from '../../stories/storybook-helpers';

import Button from '../Button';
import InputTime, { InputTimeAsDate, InputTimeAsString } from '.';
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
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      const maxDateString = text('max', defaultMaxDate, 'Using dates');
      const minDateString = text('min', defaultMinDate, 'Using dates');
      const valueDateString = text('value', defaultValueDate, 'Using dates');
      const maxString = text('max', '20:00', 'Using times');
      const minString = text('min', '10:00', 'Using times');
      const valueString = text('value', '11:00', 'Using times');

      return (
        <InputTime
          className="m-8"
          disabled={boolean('disabled (HTML)', false, 'Common')}
          fauxDisabled={boolean('fauxDisabled', false, 'Common')}
          fuzzyInputProps={object('fuzzyInputProps', {}, 'Common')}
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
      const maxDate = new Date();
      maxDate.setHours(20);
      maxDate.setMinutes(0);
      maxDate.setSeconds(0);
      maxDate.setMilliseconds(0);
      const maxDateString = maxDate.toISOString();

      const minDate = new Date();
      minDate.setHours(10);
      minDate.setMinutes(0);
      minDate.setSeconds(0);
      minDate.setMilliseconds(0);
      const minDateString = minDate.toISOString();

      const valueDate = new Date();
      valueDate.setHours(11);
      valueDate.setMinutes(0);
      valueDate.setSeconds(0);
      valueDate.setMilliseconds(0);
      const valueDateString = valueDate.toISOString();

      const ref = React.createRef<HTMLInputElement>();

      const startOfNextHour = new Date();
      startOfNextHour.setHours(startOfNextHour.getHours() + 1);
      startOfNextHour.setMinutes(0);
      startOfNextHour.setSeconds(0);
      startOfNextHour.setMilliseconds(0);

      return (
        <>
          <Wrap>
            <Title>With string times</Title>
            <div className="text-md mb-4 italic">
              When passed time info in the format &ldquo;10:00&rdquo;,
              `InputTime` relies on `InputTimeAsString`.
              <br />
              You could instead import `InputTimeAsString` directly.
            </div>
            <InteractiveInput Component={InputTime} value="11:00" />
            <Spacer />
            <div className="text-md mb-2">
              With `max`, `min`, `step`, and `value`
            </div>
            <InteractiveInput
              Component={InputTime}
              max="20:00"
              min="10:00"
              step={900}
              value="11:00"
            />
            <Spacer />
            <div className="text-md mb-2">
              Plus `formatTime`, `timezoneOffset`, and `style.width`
            </div>
            <InteractiveInput
              Component={InputTime}
              formatTime={(date: Date) =>
                new Intl.DateTimeFormat('en-IN', {
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZone: 'Asia/Calcutta',
                  timeZoneName: 'long',
                }).format(date)
              }
              max="20:00"
              min="10:00"
              step={900}
              style={{ width: '20em' }}
              value="11:00"
            />
          </Wrap>
          <Wrap>
            <Title>With Date times</Title>
            <div className="text-md mb-4 italic">
              When passed time info in the format
              &ldquo;2020-08-20T12:00:00.000Z&rdquo;, `InputTime` relies on
              `InputTimeAsDate`.
              <br />
              You could instead import `InputTimeAsDate` directly.
            </div>
            <InteractiveInput Component={InputTime} value={valueDateString} />
            <Spacer />
            <div className="text-md mb-2">
              With `max`, `min`, `step`, and `value`
            </div>
            <InteractiveInput
              Component={InputTime}
              max={maxDateString}
              min={minDateString}
              step={900}
              value={valueDateString}
            />
            <Spacer />
            <div className="text-md mb-2">
              Plus `formatTime`, `timezoneOffset`, and `style.width`
            </div>
            <InteractiveInput
              Component={InputTime}
              formatTime={(date: Date) =>
                new Intl.DateTimeFormat('en-IN', {
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZone: 'Asia/Calcutta',
                  timeZoneName: 'long',
                }).format(date)
              }
              max={maxDateString}
              min={minDateString}
              step={900}
              style={{ width: '20em' }}
              timeZoneOffset={330}
              value={valueDateString}
            />
          </Wrap>
          <Wrap>
            <Title>Other use cases</Title>
            <div className="text-md mb-2">
              Requires you to pick a future date time
            </div>
            <InteractiveInput
              Component={InputTime}
              min={startOfNextHour.toISOString()}
              step={3600}
              value={startOfNextHour.toISOString()}
            />
            <Spacer />
            <div className="text-md mb-2">
              With a custom `formatTime` function
            </div>
            <InteractiveInput
              Component={InputTime}
              formatTime={(date: Date) =>
                `${date.getHours()}🎈:${date.getMinutes()}🐝`
              }
              value="11:00"
            />
            <Spacer />
            <div className="text-md mb-2">
              Override menu max-height with `dropdownProps.menuProps`
            </div>
            <InteractiveInput
              Component={InputTime}
              dropdownProps={{ menuProps: { style: { maxHeight: '75px' } } }}
              value="11:00"
            />
            <Spacer />
            <div className="text-md mb-2">
              Without the dropdown time selector
            </div>
            <InteractiveInput
              Component={InputTime}
              showDropdown="none"
              value="11:00"
            />
            <Spacer />
            <div className="text-md mb-2">Disabled</div>
            <InteractiveInput Component={InputTime} disabled value="11:00" />
            <Spacer />
            <div className="text-md mb-2">Using a `ref` to control focus</div>
            <InputTime ref={ref} value="11:00" />{' '}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Button onClick={() => (ref.current as any)?.focus()}>
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
  )
  .add(
    'Advanced Date usage',
    () => {
      const defaultMaxDate = useMemo(() => {
        const d = new Date();
        d.setHours(11);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      const defaultMinDate = useMemo(() => {
        const d = new Date();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      const defaultValueDate = useMemo(() => {
        const d = new Date();
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      return (
        <Wrap>
          <Title>Advanced Date usage</Title>
          <p className="text-sm">
            <strong>
              This component uses a custom `timeZoneOffset`, defaulted to India
              Standard Time.
            </strong>
          </p>
          <p className="text-sm">
            The offset changes the interaction of min, max, and date values,
            attempting to correctly populate the dropdown with time selections
            from the current calendar day in the target time zone.
          </p>
          <p className="text-sm">
            <strong>
              This component uses a custom `formatTime` function based on
              JavaScript&apos;s native `Intl.DateTimeFormat`.
            </strong>
          </p>
          <p className="text-sm">
            The formatter displays UTC times relative to a target time zone, in
            a target language. Currently, it&apos;s set to Indian English and
            the &ldquo;Asia/Calcutta&rdquo; time zone.
          </p>
          <InteractiveInput
            Component={InputTime}
            formatTime={(date: Date) =>
              new Intl.DateTimeFormat('en-IN', {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'Asia/Calcutta',
                timeZoneName: 'long',
              }).format(date)
            }
            max={text('max', defaultMaxDate)}
            min={text('min', defaultMinDate)}
            onChange={action('onChange (HTML)')}
            step={number('step (seconds)', 60 * 60, { min: 60, max: 60 * 60 })}
            style={{ width: '20em' }}
            timeZoneOffset={number('timeZoneOffset (minutes)', 330)}
            value={text('value', defaultValueDate)}
          />
        </Wrap>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );

storiesOf('Planets/InputTime/InputTimeAsDate', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
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

      const defaultValueDate = useMemo(() => {
        const d = new Date();
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d.toISOString();
      }, []);

      return (
        <InputTimeAsDate
          className="m-8"
          disabled={boolean('disabled (HTML)', false)}
          fauxDisabled={boolean('fauxDisabled', false)}
          onChange={action('onChange (HTML)')}
          placeholder={text('placeholder(HTML)', 'Placeholder')}
          max={text('max', defaultMaxDate)}
          min={text('min', defaultMinDate)}
          showDropdown={select('showDropdown', showDropdownOptions, 'click')}
          step={number('step (seconds)', 60 * 60, { min: 60, max: 60 * 60 })}
          value={text('value', defaultValueDate)}
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
      const maxDate = new Date();
      maxDate.setHours(20);
      maxDate.setMinutes(0);
      maxDate.setSeconds(0);
      maxDate.setMilliseconds(0);
      const maxDateString = maxDate.toISOString();

      const minDate = new Date();
      minDate.setHours(10);
      minDate.setMinutes(0);
      minDate.setSeconds(0);
      minDate.setMilliseconds(0);
      const minDateString = minDate.toISOString();

      const valueDate = new Date();
      valueDate.setHours(11);
      valueDate.setMinutes(0);
      valueDate.setSeconds(0);
      valueDate.setMilliseconds(0);
      const valueDateString = valueDate.toISOString();

      const startOfNextHour = new Date();
      startOfNextHour.setHours(startOfNextHour.getHours() + 1);
      startOfNextHour.setMinutes(0);
      startOfNextHour.setSeconds(0);
      startOfNextHour.setMilliseconds(0);

      return (
        <>
          <Wrap>
            <Title>With minimal props</Title>
            <InteractiveInput
              Component={InputTimeAsDate}
              value={valueDateString}
            />
          </Wrap>
          <Wrap>
            <Title>With `max`, `min`, `step`, and `value`</Title>
            <InteractiveInput
              Component={InputTimeAsDate}
              max={maxDateString}
              min={minDateString}
              step={900}
              value={valueDateString}
            />
          </Wrap>
          <Wrap>
            <Title>
              Plus `formatTime`, `timezoneOffset`, and `style.width`
            </Title>
            <InteractiveInput
              Component={InputTimeAsDate}
              formatTime={(date: Date) =>
                new Intl.DateTimeFormat('en-IN', {
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZone: 'Asia/Calcutta',
                  timeZoneName: 'long',
                }).format(date)
              }
              max={maxDateString}
              min={minDateString}
              step={900}
              style={{ width: '20em' }}
              timeZoneOffset={330}
              value={valueDateString}
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

storiesOf('Planets/InputTime/InputTimeAsString', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      return (
        <InputTimeAsString
          className="m-8"
          disabled={boolean('disabled (HTML)', false)}
          fauxDisabled={boolean('fauxDisabled', false)}
          fuzzyInputProps={object('fuzzyInputProps', {})}
          onChange={action('onChange (HTML)')}
          placeholder={text('placeholder(HTML)', 'Placeholder')}
          max={text('max', '20:00')}
          min={text('min', '10:00')}
          showDropdown={select('showDropdown', showDropdownOptions, 'click')}
          step={number('step (seconds)', 60 * 60, { min: 60, max: 60 * 60 })}
          value={text('value', '11:00')}
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
      return (
        <>
          <Wrap>
            <Title>With minimal props</Title>
            <InteractiveInput Component={InputTimeAsString} value="11:00" />
          </Wrap>
          <Wrap>
            <Title>With `max`, `min`, `step`, and `value`</Title>
            <InteractiveInput
              Component={InputTimeAsString}
              max="20:00"
              min="10:00"
              step={900}
              value="11:00"
            />
          </Wrap>
          <Wrap>
            <Title>
              Plus `formatTime`, `timezoneOffset`, and `style.width`
            </Title>
            <InteractiveInput
              Component={InputTimeAsString}
              formatTime={(date: Date) =>
                new Intl.DateTimeFormat('en-IN', {
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZone: 'Asia/Calcutta',
                  timeZoneName: 'long',
                }).format(date)
              }
              max="20:00"
              min="10:00"
              step={900}
              style={{ width: '20em' }}
              value="11:00"
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
