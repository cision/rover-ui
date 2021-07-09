import React, { createRef } from 'react';
import { storiesOf } from '@storybook/react';

import Form from '.';
import Readme from './README.md';
import Button from '../Button';
import Input from '../Input';
import styles from './story.module.css';

storiesOf('Uncategorized/Form', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add(
    'Overview',
    () => {
      const ref = createRef<HTMLInputElement>();

      return (
        <Form
          id="my_damn_form"
          initialValues={{ nameInput: 'James T. Kirk' }}
          // eslint-disable-next-line no-alert
          onSubmit={(values) => alert(JSON.stringify(values))}
          validationSchema={{
            nameInput: {
              // This is a ValidityState key.
              //
              valueMissing: {
                message: 'Custom data missing error message',
              },
              // This validator is basically providing a custom error message for a:
              //
              //   <input pattern="..." />
              //
              // validator. If the key were named 'patternMismatch' instead, and the nameInput element
              // had the attribute:
              //
              //   pattern="^([a-zA-Z]+)\.?(\s+[a-zA-Z]+\.?)?\s+([a-zA-Z]+)$"
              //
              // then the effect would be the same -- the 'message' below would be used as the
              // custom error message (and the validator field would be ignored, since the 'patternMismatch'
              // key turns it into a native validator.
              //
              nameMisformatted: {
                message:
                  'Name field requires a first name, optional middle name, and last name',
                validator: (value) => {
                  // This likely isn't a super-bulletproof way of doing this validation.
                  //
                  return /^([a-zA-Z]+)\.?(\s+[a-zA-Z]+\.?)?\s+([a-zA-Z]+)$/.test(
                    value
                  );
                },
              },
            },
          }}
        >
          {({ formState, values, handleChange, handleBlur, handleCustom }) => {
            return (
              <div className={styles.inputContainer}>
                <div className={styles.personName}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="text-xl inline-block mb-2">
                    Name
                    <br />
                    <Input
                      type="text"
                      name="nameInput"
                      value={values.nameInput}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={styles.nameInputErrorMessage}
                      ref={ref}
                    />
                    <div>{formState.validationErrors.nameInput}</div>
                  </label>
                </div>

                <div className={styles.personAge}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="text-xl inline-block mb-2">
                    Age
                    <br />
                    <Input
                      type="number"
                      min="18"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </label>
                </div>

                <div className={styles.actions}>
                  <Button
                    type="button"
                    onClick={handleCustom('nameInput', (name) =>
                      name.toUpperCase()
                    )}
                    style={{ margin: '20px 15px 15px 0' }}
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
                </div>
              </div>
            );
          }}
        </Form>
      );
    },
    {
      info: {
        inline: true,
        source: true,
      },
    }
  );
