import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Radio from '.';
import Readme from './README.md';

import { InteractiveInput, Wrap } from '../../../stories/storybook-helpers';

storiesOf('Planets/Input/Radio', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Wrap>
        {/*
          Eslint doesn't recognise that the `InteractiveInput` wrappers are
          putting IDs on input elements, but they are.
        */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="text-xl inline-block mb-2">
          {`<Radio />`}
          <p className="mt-6">
            <small>
              <em>
                Radio is a bare input. You&apos;ll have to provide your own
                label. &ldquo;Control&rdquo; components with integrated labels
                and validation messages are on the roadmap.
              </em>
            </small>
          </p>
          <div>
            <Radio
              checked={boolean('checked', false)}
              className={text('className (HTML)', 'w-full')}
              id="SampleRadio"
              onChange={action('onChange (HTML)')}
            />
          </div>
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
        <h2>Radio</h2>
        <p className="mt-6">
          <small>
            <em>
              Radio is a bare input - the labels are provided for documentation
              purposes only. &ldquo;Control&rdquo; components with integrated
              labels and validation messages are on the roadmap.
            </em>
          </small>
        </p>
        <p className="mt-6">
          <small>
            This component is identical to {'`<Input type="radio" />`'}.
          </small>
        </p>
        <p className="mt-6">
          <small>
            These examples use an `InteractiveInput` wrapper with an
            `InputRenderer` prop. In actual implementations, just use a `Radio`
            component, `onChange`, and `checked` props instead.
          </small>
        </p>
        <div>
          {[[], ['checked'], ['disabled'], ['checked', 'disabled']].map(
            (attributes) => {
              const attributesId = ['atts', ...attributes].join('-');
              const attributesLabel = attributes.join(' and ') || 'default';

              const attributesProps = attributes.reduce(
                (acc, attr) => ({ ...acc, [attr]: true }),
                {}
              );

              return (
                <div className="my-6" key={attributesId}>
                  <label htmlFor={attributesId}>
                    {attributesLabel}{' '}
                    <InteractiveInput
                      InputRenderer={Radio}
                      id={attributesId}
                      onChange={action(`onChange ${attributesLabel}`)}
                      {...attributesProps}
                    />
                  </label>
                </div>
              );
            }
          )}
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
