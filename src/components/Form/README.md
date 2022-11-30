# \<Form\>

**Validate form inputs and handle validation events.**

The `Form` component wraps one or more `input` elements and provides a validation structure for data entered therein.
Given a validation schema set a prop on `Form`, the components apply the validation logic to any contained input.
Form state, i.e. the results of the validation, are returned to children of `Form` for use, e.g. in displaying (or
removing) an error message.

### ValidityState API

`Form` utilizes the `ValidityState API`, information about which can be found in the [HTML RFC][1] and its [MDN
Documentation][2]. `ValidityState` sets its state on a handful of properties,
most of which correspond to `input` elements of various types:

- [patternMismatch][3]
- [rangeOverflow][4]
- [rangeUnderflow][5]
- [stepMismatch][6]
- [tooLong][7]
- [tooShort][8]
- [typeMismatch][9]
- valueMissing

### ValidationSchema (property)

The passed-in `validationSchema` is an object whose keys match the `name` property of `input` (or of the `Input`
component, if used). Each of these name keys point to an object which contains configuration keys for each validator,
which may or may not match a built-in `ValidityState` key.

The validator itself can contain a `validator` property (runs on input change and/or DOM initialization), and a
`message` property to use in displaying a static error message or explanatory text:

**Simple example with built-in validators:**

```jsx
<Form
  validationSchema={{
    NameInput: {
      valueMissing: {
        message: 'Hey, you got a name. Share it!',
      },
    },
    AgeInput: {
      rangeUnderflow: {
        message: 'You gotta be 25 to rent a car, son.',
      },
    },
  }}
>
  <input name="NameInput" type="text" />
  <input name="AgeInput" type="number" min="25" />
</Form>
```

When setting up a custom message for a built-in validator, if the `validator` property is included, it's ignored
since built-in criteria are used for validation.

### ValidationSchema: message

Also, for built-in and custom validators, the `message` property can either be a string or a function returning a
string, whose first argument is injected as the `input` in question. For instance, the `AgeInput` validator above
could be more robustly defined as:

**Dynamic error message:**

```jsx
validationSchema={{
  ...
  AgeInput: {
    rangeUnderflow: {
      message: elem => 'You gotta be ' + elem.min + ' to rent a car, son.',
    },
  },
```

### ValidationSchema: validator

Custom validators use arbitrary key validator names, and can specify either or both of `message` and `validator`:

**Custom validator example:**

```jsx
<Form
  validationSchema={{
    NameInput: {
      valueMissing: {
        message: 'Hey, you got a name. Share it!',
      },
      nameMisformatted: {
        message:
          'Name field requires a first name, optional middle name, and last name. But you already knew that.',
        validator: value => /^([a-zA-Z]+)\.?(\s+[a-zA-Z]+\.?)?\s+([a-zA-Z]+)$/.test(
          value
        );
      },
    },
  }}
>
  <input
    name="NameInput"
    type="text"
  />
</Form>
```

If `validator` is not specified, the element value will always be considered valid, so this property is essentially
required.
If specified, the `validator` function receives the element value, and the element as its two injected arguments,
and returns either `true`, `false`, or a string.

Returning `false` triggers the invalid UX on the field whose
error message is specified in the `message` attribute, which as above is either a function or a string. If
`message` isn't specified, a generic error message will be used in the error case.

Additionally, the `validator` function itself can return a string (which is considered a failed validation), to be
used as the error message which is functionally equivalent to a defined `message` property, and if the validator
does return a string, the `message` attribute, if any, will not be used or invoked.

If an `input's` configuration specifies both built-in and custom validator(s), the latter will only be run if the
built-in ones
pass. Multiple custom validators are not currently supported, and if more than one is specified, a random one in
the schema data structure for that `input` will be used.

### InputValues (property)

This is a simple object keyed on an `input's` `name` property, containing initial values for however many `inputs`
are specified in the structure.

### onSubmit (property)

The `onSubmit` property specifies a function which executes whenever the `submit` event fires. The function runs
with `await`, so asynchronous actions and dispatches can be executed in the `onSubmit`.

The firing of `onSubmit`
uses `preventDefault` to intercept the natural `submit` behavior, so if `POST` behavior is desired as a result of
the `onSubmit` executing, that must be specifically implemented in the function.

If a validation error is encountered, `onSubmit` should `throw` a string as an error.

### Form Context

Form surrounds its children containing these properties accessible by context consumers as `FormContext`:

- `touched`: Object (keyed on form control name) consisting of booleans indicated whether form control has been
  interacted with in
  any way by a user
- `validationErrors`: Object (keyed on name) consisting of error message strings for validated form controls (if a
  control is in an error state),
- `isSubmitting`: Boolean indicating whether or not a `Form` is in the process of being submitted, i.e. is the state
  of the `Form` in the
  interval between the initial calling of the `handleSubmit` handler, and the return of the `onSubmit` callback prop
  indicating validation success or failure (which halts the submission),
- `submitError`: Any string indicating an error thrown by `onSubmit`
- `values`: Object (keyed on form control name) consisting of the current values of the controls contained in `Form`
- `handleChange`: A function to attach to the `onChange` event of an `input` or `Input` to be fired when the
  `change` event occurs.
  Of
  course, if more needs to
  happen `onChange`, `handleChange` (with `event` as its single argument) should be called within the wrapper function.
- `handleBlur`: As `handleChange`, but pertaining to the `blur` event.
- `handleCustom`: A function that can be attached to a form control's event handler, and which receives the control',
  and a callback as its arguments. The callback receives
  the named control's previous value, and gives the callback an opportunity to modify that control's value. A
  common example of such a callback would be one that capitalizes an `input` or `Inputs` data on the click of a
  `button` element.

[1]: https://html.spec.whatwg.org/multipage/form-control-infrastructure.
[2]: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
[3]: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch
[4]: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow
[5]: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow
[6]: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch
[7]: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong
[8]: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort
[9]: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch
