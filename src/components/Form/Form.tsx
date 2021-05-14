import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';

type SchemaElement = {
  message: string;
  validate: (value) => boolean;
};

export interface FormProps {
  children?: (config) => React.ReactElement;
  initialValues?: Record<string, string | boolean>;
  validationSchema?: Record<string, SchemaElement>;
  onSubmit?: Function;
  className?: string;
}

const Form: React.FC<FormProps> = ({
  children,
  initialValues = {},
  validationSchema = {},
  onSubmit = () => {},
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (_isEmpty(validationErrors)) {
      setIsSubmitting(true);
    }
  };

  const handleCustom = (fieldName: string, callback: Function) => (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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

  return children ? (
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
  ) : null;
};

export default Form;
