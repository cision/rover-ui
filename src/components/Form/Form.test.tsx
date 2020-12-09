import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import Form from './index';

const defaultProps = {
  className: 'some_classname',
  initialValues: {
    textInput: '',
    radioInput: false,
    checkboxInput: false,
  },
  validationSchema: {},
  onSubmit: jest.fn(),
};

interface DefaultPropsType {
  className?: string;
  initialValues?: {
    textInput: string;
    radioInput: boolean;
    checkboxInput: boolean;
  };
  validationSchema?: {};
  onSubmit?: Function;
  onCustom?: {
    fieldName: string;
    callback: () => string;
  };
}

const renderForm = (props: DefaultPropsType = defaultProps) =>
  render(
    <Form {...defaultProps} {...props}>
      {({ formValues, formState, handleChange, handleBlur, handleCustom }) => (
        <>
          <pre data-testid="form-data">
            {JSON.stringify({ formValues, formState })}
          </pre>
          {formState.formSubmitError && (
            <div>{formState.formSubmitError.message}</div>
          )}
          <input
            data-testid="text-input"
            type="text"
            name="textInput"
            value={formValues.textInput}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            data-testid="radio-input"
            type="radio"
            name="radioInput"
            onChange={handleChange}
            checked={formValues.radioInput}
          />
          <input
            data-testid="checkbox-input"
            type="checkbox"
            name="checkboxInput"
            onChange={handleChange}
            checked={formValues.checkboxInput}
          />
          {props.onCustom && (
            <button
              type="submit"
              data-testid="custom-button"
              onClick={handleCustom(
                props.onCustom.fieldName,
                props.onCustom.callback
              )}
            >
              Evolve it!
            </button>
          )}
          <button data-testid="submit-button" type="submit">
            Submit
          </button>
        </>
      )}
    </Form>
  );

describe('<Form />', () => {
  it('handles inputs', () => {
    const { getByTestId } = renderForm();
    const someText = { target: { value: 'some text' } };
    const textInput = getByTestId('text-input') as HTMLInputElement;
    const radioInput = getByTestId('radio-input') as HTMLInputElement;
    const checkboxInput = getByTestId('checkbox-input') as HTMLInputElement;

    fireEvent.change(textInput, someText);
    fireEvent.click(radioInput);
    fireEvent.click(checkboxInput);

    const { formValues } = JSON.parse(getByTestId('form-data').innerHTML);

    expect(textInput.value).toEqual(someText.target.value);
    expect(formValues.textInput).toEqual(someText.target.value);

    expect(radioInput.checked).toEqual(true);
    expect(formValues.radioInput).toEqual('on'); // this is odd

    expect(checkboxInput.checked).toEqual(true);
    expect(formValues.checkboxInput).toEqual(true);
  });

  it('handles blur events', () => {
    const { getByTestId } = renderForm();
    const textInput = getByTestId('text-input');

    fireEvent.blur(textInput);

    const { formState } = JSON.parse(getByTestId('form-data').innerHTML);

    expect(formState.touched.textInput).toEqual(true);
  });

  it('handles custom events', () => {
    const { getByTestId } = renderForm({
      onCustom: {
        fieldName: 'textInput',
        callback: () => 'raichu',
      },
    });

    const someText = { target: { value: 'pikachu' } };
    const textInput = getByTestId('text-input') as HTMLInputElement;
    fireEvent.change(textInput, someText);

    const customBtn = getByTestId('custom-button');
    fireEvent.click(customBtn);

    const { formValues } = JSON.parse(getByTestId('form-data').innerHTML);

    expect(textInput.value).toEqual('raichu');
    expect(formValues.textInput).toEqual('raichu');
  });

  it('validates inputs', async () => {
    const { getByTestId } = renderForm({
      validationSchema: {
        textInput: {
          message: 'anything but bidoof',
          validate: (value) => value !== 'bidoof',
        },
      },
    });
    const textInput = getByTestId('text-input');

    fireEvent.change(textInput, { target: { value: 'bidoof' } });

    const { formState } = JSON.parse(getByTestId('form-data').innerHTML);

    expect(formState.validationErrors.textInput).toEqual('anything but bidoof');
  });

  it('handles successful submit with all form values', async () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const { getByTestId } = renderForm({ onSubmit });
    const submitBtn = getByTestId('submit-button');
    const formData = getByTestId('form-data');

    // assert isSubmitting false
    const { formState: initialFormState } = JSON.parse(formData.innerHTML);
    expect(initialFormState.isSubmitting).toEqual(false);

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    // assert isSubmitting false when done
    const { formState: finalFormState } = JSON.parse(formData.innerHTML);
    expect(finalFormState.isSubmitting).toEqual(false);

    // using hoisting to get access to getByTestId and onSubmit
    async function onSubmit(values) {
      // assert isSubmitting true while running
      const { formState: intermediateFormState } = JSON.parse(
        formData.innerHTML
      );
      expect(values).toEqual(defaultProps.initialValues);
      await Promise.resolve(() =>
        expect(intermediateFormState.isSubmitting).toEqual(true)
      );
    }
  });

  it('handles errors in onSubmit prop', async () => {
    const { getByTestId, queryByText } = renderForm({
      onSubmit: () => {
        throw new Error('Error in user defined onSubmit prop');
      },
    });
    const submitBtn = getByTestId('submit-button');
    const formData = getByTestId('form-data');

    const { formState: initialFormState } = JSON.parse(formData.innerHTML);
    expect(initialFormState.formSubmitError).toEqual(null);

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(queryByText('Error in user defined onSubmit prop')).toBeTruthy();
  });
});
