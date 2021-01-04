import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';

const Form = ({
  children,
  initialValues = {},
  validationSchema = {},
  onSubmit,
  className = '',
}) => {
  // We're already in a form, can we just call this `values`?
  const [formValues, setFormValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // We're already in a form, can we just call this `submitError`?
  const [formSubmitError, setFormSubmitError] = useState(null);

  const handleBlur = ({ target: { name } }) => {
    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // TODO: Maybe call this conditionally

    if (_isEmpty(validationErrors)) {
      setIsSubmitting(true);
    }
  };

  const handleCustom = (fieldName: string, callback: Function) => (
    e: Event
  ) => {
    e.preventDefault(); // TODO: maybe call this conditionally

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: callback(prevFormValues[fieldName]),
    }));
  };

  const handleChange = ({ target: { name, type, value, checked } }) => {
    const newValue = type === 'checkbox' ? checked : value;

    setFormValues((prevFormValues) =>
      _set({ ...prevFormValues }, name, newValue)
    );
  };

  useEffect(() => {
    const validateInputs = () => {
      const errors = Object.entries(formValues).reduce(
        (errorsObject, [fieldName, fieldValue]) => {
          const fieldValidation = validationSchema[fieldName];
          if (
            fieldValidation?.validate &&
            fieldValidation?.message &&
            !fieldValidation.validate(fieldValue)
          ) {
            return {
              ...errorsObject,
              [fieldName]: fieldValidation.message,
            };
          }

          return errorsObject;
        },
        {}
      );

      setValidationErrors(errors);
    };

    validateInputs();
  }, [formValues, validationSchema]);

  useEffect(() => {
    if (!isSubmitting) return;

    (async () => {
      try {
        await onSubmit(formValues);
        setIsSubmitting(false);
        if (formSubmitError) {
          setFormSubmitError(null);
        }
      } catch (error) {
        setIsSubmitting(false);
        setFormSubmitError(error);
      }
    })();
  }, [isSubmitting, formSubmitError, formValues, onSubmit]);

  if (!children) {
    return null;
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children({
        formState: {
          touched,
          validationErrors,
          isSubmitting,
          formSubmitError,
        },
        formValues,
        handleChange,
        handleBlur,
        handleCustom,
      })}
    </form>
  );
};

export default Form;
