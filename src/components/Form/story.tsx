import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '.';
import Readme from './README.md';
import Button from '../Button';
import Input from '../Input';

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
        onSubmit={(values) => alert(JSON.stringify(values))}
        validationSchema={{
          nameInput: {
            message: 'No empty strings',
            validate: (value) => value !== '',
          },
        }}
      >
        {({ formState, values, handleChange, handleBlur, handleCustom }) => (
          <>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="text-xl inline-block mb-2">
              Name
              <Input
                type="text"
                name="nameInput"
                value={values.nameInput}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>

            <Button
              type="button"
              onClick={handleCustom('nameInput', (name) => name.toUpperCase())}
              style={{ margin: '20px' }}
            >
              Capitalize
            </Button>

            <Button
              disabled={formState.validationErrors.nameInput}
              data-testid="submit-button"
              type="submit"
            >
              Submit
            </Button>
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
