import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

import Checkbox from '.';
import Readme from './README.md';

import { InteractiveInput, Wrap } from '../../../stories/storybook-helpers';

storiesOf('Planets/Input/Checkbox', module)
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
          {`<Checkbox />`}
          <p className="mt-6">
            <small>
              <em>
                Checkbox is a bare input. You&apos;ll have to provide your own
                label. &ldquo;Control&rdquo; components with integrated labels
                and validation messages are on the roadmap.
              </em>
            </small>
          </p>
          <div>
            <Checkbox
              checked={boolean('checked', false)}
              className={text('className (HTML)', 'w-full')}
              fauxDisabled={boolean('fauxDisabled', false)}
              id="SamplCheckbox"
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
        <h2>Checkbox</h2>
        <p className="mt-6">
          <small>
            <em>
              Checkbox is a bare input - the labels are provided for
              documentation purposes only. &ldquo;Control&rdquo; components with
              integrated labels and validation messages are on the roadmap.
            </em>
          </small>
        </p>
        <p className="mt-6">
          <small>
            This component is identical to {'`<Input type="checkbox" />`'}.
          </small>
        </p>
        <p className="mt-6">
          <small>
            These examples use an `InteractiveInput` wrapper with an
            `InputRenderer` prop. In actual implementations, just use a
            `Checkbox` component, `onChange`, and `checked` props instead.
          </small>
        </p>
        <div>
          {[
            [],
            ['checked'],
            ['disabled'],
            ['fauxDisabled'],
            ['checked', 'disabled'],
          ].map((attributes) => {
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
                    InputRenderer={Checkbox}
                    id={attributesId}
                    onChange={action(`onChange ${attributesLabel}`)}
                    {...attributesProps}
                  />
                </label>
              </div>
            );
          })}
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
