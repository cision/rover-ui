import React, { useState, useEffect, createContext } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';

type ValidationSchema = {
  [key: string]: Record<string, SchemaElement>;
};

interface SchemaElement {
  message: ((element?: HTMLInputElement) => string) | string;
  validator?: (value: string, element?: HTMLInputElement) => boolean | string;
}

export interface FormProps {
  id?: string;
  children?: React.ComponentClass | React.FunctionComponent | React.ReactNode;
  initialValues?: Record<string, string | boolean>;
  validationSchema?: ValidationSchema;
  onSubmit?: Function;
  className?: string;
}

export interface FormContext {
  formState: FormState;
  values: Record<string, string | string[] | number | boolean | undefined>;
  handleChange: ({ target: t }: { target: HTMLInputElement }) => void;
  handleBlur: ({ target: t }: { target: HTMLInputElement }) => void;
  handleCustom: (name: string, callback: (value: string) => void) => void;
}

export interface FormState {
  touched: Record<string, boolean>;
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
  submitError;
}

const NATIVE_VALIDATORS = [
  'badInput',
  'customError',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valueMissing',
];

const getValidityKeys = (validity) => {
  const validityKeys: string[] = [];
  Object.keys(validity).forEach((validityKey) => {
    validityKeys.push(validityKey);
  });
  return validityKeys;
};

export const FormContext = createContext({});

const Form: React.FC<FormProps> = ({
  id = 'a_form',
  children,
  initialValues = {},
  validationSchema = {},
  onSubmit = () => {},
  className = '',
}) => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState(null);

  const [validatingElement, setValidatingElement] = useState<
    HTMLInputElement
  >();

  const [customValidations, setCustomValidations] = useState<SchemaElement>(
    {} as SchemaElement
  );

  const isNativeError = (element) => {
    return (
      NATIVE_VALIDATORS.filter((v) => v !== 'customError').find(
        (v) => element.validity[v]
      ) !== undefined
    );
  };

  useEffect(() => {
    // Save off the custom validators
    //
    Object.keys(validationSchema).forEach((elementName) => {
      Object.keys(validationSchema[elementName]).forEach((validationType) => {
        if (!NATIVE_VALIDATORS.includes(validationType)) {
          const customValidator = validationSchema[elementName][validationType];
          if (customValidator) {
            setCustomValidations((prevState) => {
              return {
                ...prevState,
                [elementName]: customValidator,
              };
            });
          }
        }
      });
    });
  }, [validationSchema]);

  const handleBlur = ({ target: t }: { target: HTMLInputElement }) => {
    const { name } = t;
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

  const handleChange = ({ target: t }: { target: HTMLInputElement }) => {
    const { name, type, value, checked } = t;
    const newValue = type === 'checkbox' ? checked : value;
    setValidatingElement(t);
    setValues((prevValues) => _set({ ...prevValues }, name, newValue));
  };

  useEffect(() => {
    if (!validatingElement) {
      return;
    }

    const validateInputs = () => {
      const errors = Object.entries(values).reduce(
        (errorsObject, [fieldName]) => {
          const fieldValidation = validationSchema[fieldName];
          if (!fieldValidation) {
            return errorsObject;
          }

          const customValidation = customValidations[fieldName];
          const isValidFromNativeValidators = !isNativeError(validatingElement);

          // If the native validator -- valueMissing, patternMismatch, etc. -- reports valid, then any
          // custom validator gets run.
          //
          let errorMessage: ((elem) => string) | string = '';

          if (isValidFromNativeValidators && customValidation) {
            if (values) {
              const validator = customValidation.validator || (() => true);
              const validationReturnValue = validator(
                values[fieldName],
                validatingElement
              );

              // A custom error message, to be displayed as a tooltip or whatnot, that the validator itself returns.
              // Useful for error messages whose composition depend on other values.
              //
              if (typeof validationReturnValue === 'string') {
                errorMessage = validationReturnValue;
              }
              // A custom error message, whose value is static.
              //
              else if (validationReturnValue === false) {
                errorMessage = customValidation.message;
              }
            }
          }

          // Reset custom validation errors, if any, and allow native errors to display on the element and Form's
          // agglomeration of error messages.
          //
          else if (!isValidFromNativeValidators) {
            let nativeErrorName = '';
            getValidityKeys(validatingElement.validity).some((key) => {
              if (validatingElement.validity[key]) {
                nativeErrorName = key;
                return true;
              }
              return false;
            });

            errorMessage = fieldValidation[nativeErrorName]?.message || '';
          }

          if (errorMessage) {
            const errorText =
              typeof errorMessage === 'function'
                ? errorMessage(validatingElement)
                : errorMessage;
            validatingElement.setCustomValidity(errorText);
            validatingElement?.reportValidity();
            errorsObject = {
              ...errorsObject,
              [fieldName]: errorText,
            };
          } else {
            validatingElement.setCustomValidity('');
            validatingElement?.reportValidity();
          }

          return errorsObject;
        },
        {}
      );

      setValidationErrors(errors);
    };

    validateInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <FormContext.Provider
      value={
        {
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
        } as FormContext
      }
    >
      <form className={className} onSubmit={handleSubmit} id={id}>
        {children}
      </form>
    </FormContext.Provider>
  ) : null;
};

export default Form;
