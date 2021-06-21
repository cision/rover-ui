import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import { Spacer, Wrap, WrapClear } from '../../stories/storybook-helpers';

import Option from './Option';
import './Option/story';
import Select from '.';
import Readme from './README.md';

storiesOf('Planets/Select', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .addDecorator((Story) => <WrapClear>{Story()}</WrapClear>)
  .add(
    'Overview',
    () => {
      const now = new Date();
      const className = text('className', '');
      const disabled = boolean('disabled', false);
      const fauxDisabled = boolean('fauxDisabled', false);
      const id = text('id', '');
      const placeholder = text('placeholder', 'Choose something');

      return (
        <Select
          className={className}
          disabled={disabled}
          fauxDisabled={fauxDisabled}
          id={id}
          onChange={action('onChange')}
          placeholder={placeholder}
        >
          <Option>
            Hi! I&apos;m a child of your new `&lt;Select&gt;` component.
          </Option>
          <Option value={now.toString()}>Now</Option>
          <Option value="HAS A CAT">
            <span role="img" aria-label="Cat emoji">
              🐱
            </span>
          </Option>
        </Select>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );

storiesOf('Planets/Select', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Examples',
    () => {
      return (
        <Wrap>
          <div>With `autofocus`</div>
          <Select autoFocus onChange={action('onChange with autoFocus')}>
            <Option>Option 1</Option>
          </Select>
          <Spacer />
          <div>With `placeholder=&quot;Pick one&quot;`</div>
          <Select
            onChange={action('onChange with placeholder')}
            placeholder="Choose one"
          >
            <Option>Option 1</Option>
          </Select>
          <Spacer />
          <div>Auto-scroll to selected element on open</div>
          <Select
            defaultValue="Option 10"
            onChange={action('onChange with placeholder')}
            placeholder="Choose one"
          >
            <Option>Option 1</Option>
            <Option>Option 2</Option>
            <Option>Option 3</Option>
            <Option>Option 4</Option>
            <Option>Option 5</Option>
            <Option>Option 6</Option>
            <Option disabled>Option 7</Option>
            <Option>Option 8</Option>
            <Option>Option 9</Option>
            <Option>Option 10</Option>
          </Select>
          <Spacer />
          <div>With `position=&quot;top&quot;`</div>
          <Select
            defaultValue=""
            onChange={action('onChange opens up')}
            position="top"
          >
            <Option>Opens above toggle</Option>
          </Select>
          <Spacer />
          <div>With `disabled`</div>
          <Select disabled placeholder="Choose one (disabled)">
            <Option>Option 1</Option>
          </Select>
        </Wrap>
      );
    },
    {
      info: {
        inline: false,
        source: true,
      },
    }
  );
