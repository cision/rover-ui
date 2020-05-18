/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from '.';
import Readme from './README.md';

const InputWrapper = ({ label, children }) => {
  return (
    <div className="flex flex-no-wrap flex-row justify-start items-baseline mb-5">
      <span className="w-40 flex-grow-0 inline-block p-1 text-gray-500 pr-4 mr-4 border-r h-full">
        {label}
      </span>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

const Overview = () => {
  const [text, setText] = useState('Hello, I am text');
  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-2">
      <div className="w-full p-4 bg-white rounded shadow-lg mb-5">
        <h2 className="text-3xl mb-3">Basic Input</h2>
        <InputWrapper label="Empty">
          <Input
            onChange={action('onKeyPress first')}
            placeholder="Search here..."
          />
        </InputWrapper>
        <InputWrapper label="With Content">
          <Input
            value={text}
            onChange={(e) => action('onChange')() && setText(e.target.value)}
            placeholder="Search here..."
          />
        </InputWrapper>
        <InputWrapper label="autofocus">
          <Input
            autofocus
            onChange={(e) => action('onChange')() && setText(e.target.value)}
            placeholder="Search here..."
          />
        </InputWrapper>
        <InputWrapper label="Disabled">
          <Input
            disabled
            value={text}
            onChange={(e) => action('onChange')() && setText(e.target.value)}
            placeholder="Search here..."
          />
        </InputWrapper>
        <InputWrapper label="Error">
          <Input
            isError
            value={text}
            onChange={(e) => action('onChange')() && setText(e.target.value)}
            placeholder="Search here..."
          />
        </InputWrapper>
        <InputWrapper label="Disabled Error">
          <Input
            isError
            disabled
            value="Hello"
            placeholder="Search here..."
            onChange={(e) => action('onChange')() && setText(e.target.value)}
          />
        </InputWrapper>
      </div>
    </div>
  );
};

storiesOf('Planets/Form/Input', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Overview', Overview);
