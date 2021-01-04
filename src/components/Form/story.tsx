import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '.';
import Readme from './README.md';

storiesOf('Uncategorized/Form', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => (
      <Form
        initialValues={{ nameInput: 'james r. cat' }}
        // eslint-disable-next-line no-alert
        onSubmit={(formValues: JSON) => alert(JSON.stringify(formValues))}
        validationSchema={{
          nameInput: {
            message: 'No empty strings',
            validate: (value: string) => value !== '',
            /*
              Could the validate function return a string for the message, or falsey if no error?
              `validate: value => value === '' && 'Required'`
              Maybe that wouldn't be as legible, but it would allow for the user to provide different messages for different error conditions.
              Another pattern I've seen elsewhere is providing an object with multiple keys for different validation errors.
              Bear in mind that an input could be invalid for multiple reasons in some cases. HTML generally provides one string,
              but it could be up to the consumer or this component to concat messages into one.
              ```
                {
                  nameInput: {
                    required: {
                      message: 'No empty strings',
                      validate: value => value !== '',
                    }
                  }
                }
              ```
            */
          },
        }}
      >
        {({
          formState,
          formValues,
          handleChange,
          handleBlur,
          handleCustom,
        }) => (
          <>
            <label htmlFor="nameInput">
              Name
              <br />
              {/*
                Thoughts:
                1. Having the user enter `name="foo"` _and_ `formValues.foo` feels redundant.
                  Would it make sense to iterate the children or the rendered dom and apply the values that way?
                2. What happens if no submit / initial values / validation schema are added?
                  Specfically for `onSubmit`, if not provided, maybe just don't prevent the default event?
                3. handleCustom is confusing to me. Is it a change handler, blur handler, submit handler?
                   Looks like a value mutator? So perhaps `processFieldValue`. idk
              */}
              <input
                type="text"
                name="nameInput"
                value={formValues.nameInput}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            <br />

            <button
              type="button"
              onClick={handleCustom('nameInput', (name: string) =>
                name.toUpperCase()
              )}
            >
              Click to capitalize
            </button>
            <br />

            <button
              disabled={formState.validationErrors.nameInput}
              data-testid="submit-button"
              type="submit"
            >
              Submit
            </button>
          </>
        )}
      </Form>
    ),
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
