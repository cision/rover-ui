import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, date } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';
import DatePicker from './DatePicker';
import Readme from './README.md';

import { Wrap } from '../../stories/storybook-helpers';

storiesOf('Planets/DatePicker', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', () => (
    <Wrap>
      <DatePicker
        showOutsideDays={boolean('Show Outside Days', false)}
        showWeekNumbers={boolean('Show Week Numbers', false)}
        numberOfMonths={number('Number of Months', 1, {
          range: true,
          min: 1,
          max: 12,
          step: 1,
        })}
        onDayClick={action('Day Clicked')}
        selectedDays={new Date(date('Date', new Date()))}
      />
    </Wrap>
  ))
  .add('Examples', () => (
    <>
      <Wrap>
        <DatePicker
          onDayClick={action('Day Clicked')}
          selectedDays={new Date()}
          disabledDays={{ daysOfWeek: [0, 6] }}
        />
      </Wrap>
      <Wrap>
        <DatePicker onDayClick={action('Day Clicked')} showOutsideDays />
      </Wrap>
      <Wrap>
        <DatePicker
          onDayClick={action('Day Clicked')}
          month={new Date(2020, 0, 15)}
          todayButton="Today!"
        />
      </Wrap>
      <Wrap>
        <DatePicker onDayClick={action('Day Clicked')} showWeekNumbers />
      </Wrap>
      <Wrap>
        <DatePicker onDayClick={action('Day Clicked')} numberOfMonths={2} />
      </Wrap>
      <Wrap>
        <DatePicker
          onDayClick={action('Day Clicked')}
          initialMonth={new Date(2020, 11)}
          disabledDays={[
            { after: new Date(2020, 11, 23), before: new Date(2020, 11, 27) },
            new Date(2020, 11, 10),
          ]}
        />
      </Wrap>
      <Wrap>
        <DatePicker
          initialMonth={new Date(2020, 11)}
          selectedDays={[
            new Date(2020, 11, 20),
            { after: new Date(2020, 11, 23), before: new Date(2020, 11, 27) },
          ]}
        />
      </Wrap>
      <Wrap>
        <DatePicker
          month={new Date(2020, 11)}
          fromMonth={new Date(2020, 0)}
          toMonth={new Date(2020, 11)}
        />
      </Wrap>
      <Wrap>
        <DatePicker classNames={{ caption: 'addCaptionClass' }} />
      </Wrap>
    </>
  ));
