# \<InputTime\>

### InputTime component is a text-based time picker with fuzzy time matching.

The implementation re-uses the `<Input />` component, creating a standard `<input type="text" />` and a shadow `<input type="time" />`.

When the user enters text, it parses the string looking for 1-2 numbers followed by an `a` or a `p`, then casts that to a 24-hour time string matching the format `"hh:mm"`. That format is the standard for HTML time inputs.

When the user value is parsed, the component calls the `onChange` callback with the shadow time input as the change event's target. All other callbacks (`onClick`, `onBlur`, etc. are handled by the non-shadow component.)

Validation of times in HTML is handled for time-of-day only, and this component offloads that work to the `<input type="time" />` shadow component.

On blur, the user's fuzzy input is replaced with a locale-based time string.

For advanced customization, the component passes these arbitrary props objects down to child components:

- `dropdownProps` is passed to the nested `EasyDropdown` time picker.
- `fuzzyInputProps` is passed down to the child `Input` that's exposed to the user.

### Date vs. Time mode

You can pass `max`, `min`, and `value` as either time strings `"14:00"` or ISO date strings `2020-06-30T14:30:00.000Z"`.
All 3 props should match, if present.

The component will disabled the input if the entire selected date is outside the `min` and `max`. It will enable all times if the entire selected date is inside the `min` and `max`. Otherwise, it will do time-of-day validation normally.

### Coming soon

- For the optional time picker dropdown
  - Should center selection on current
  - Should have keyboard support (up arrow / down arrow for iterating through menu items)
  - Dropdown should have "focus" mode, where the dropdown is always visible when the
    time field is focused
