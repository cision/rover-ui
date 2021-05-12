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
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleBlur = ({ target: { name } }) => {
    setTouched((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (_isEmpty(validationErrors)) {
      setIsSubmitting(true);
    }
  };

  const handleCustom = (fieldName, callback) => (e) => {
    e.preventDefault(); // TODO: maybe call this conditionally

    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: callback(prevValues[fieldName]),
    }));
  };

  const handleChange = ({ target: { name, type, value, checked } }) => {
    const newValue = type === 'checkbox' ? checked : value;

    setValues((prevValues) => _set({ ...prevValues }, name, newValue));
  };

  useEffect(() => {
    const validateInputs = () => {
      const errors = Object.entries(values).reduce(
        (errorsObject, [fieldName, fieldValue]) => {
          const fieldValidation = validationSchema[fieldName];

          console.info('fieldName', validationSchema);

          if (
            fieldValidation?.validate &&
            fieldValidation?.message &&
            !fieldValidation.validate(
              fieldValue as ArrayBufferView | ArrayBuffer
            )
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
  }, [values, validationSchema]);

  useEffect(() => {
    if (!isSubmitting) return;

    (async () => {
      try {
        await onSubmit(values);
        setIsSubmitting(false);
        if (submitError) {
          setSubmitError(null);
        }
      } catch (error) {
        setIsSubmitting(false);
        setSubmitError(error);
      }
    })();
  }, [isSubmitting, submitError, values, onSubmit]);

  return (
    children && (
      <form className={className} onSubmit={handleSubmit}>
        {children({
          formState: {
            touched,
            validationErrors,
            isSubmitting,
            submitError,
          },
          values,
          handleChange,
          handleBlur,
          handleCustom,
        })}
      </form>
    )
  );
};

export default Form;
