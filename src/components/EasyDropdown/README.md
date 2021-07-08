# \<EasyDropdown\>

The easy dropdown, at its simplest, takes a `defaultIsOpen` boolean and `menuItems` list of labels/callback functions, and a text child.

Then it makes a dropdown. It handles all the toggling behavior for you.

```jsx
<EasyDropdown
  menuItems={[
    { label: 'I do nothing!' },
    { label: 'Click me!', onClick: () => {} },
    { label: 'I don't close the menu', onClick: () => {}, closeOnClick: false },
    { label: 'I also do nothing', onClick: () => {}, disabled: true },
    { label: "I'm in a group", onClick: () => {}, group: 'Group 1' },
    { label: "I'm in a group", onClick: () => {}, group: 'Group 1' },
    { label: "I'm in a group", onClick: () => {}, group: 'Group 1' },
  ]}
  defaultIsOpen={false}
>
  Simple config
</EasyDropdown>
```

If you don't define `defaultIsOpen`, the dropdown opens in fully controlled mode, and you have to provide an `isOpen` boolean and an `onToggle` function that changes it. (Even in controlled mode, `onToggle` will fire as a convenience callback.)

Optionally, you can add:

- `menuProps`, which are passed down to the rendered `Menu` component that's rendered when the dropdown opens.
- `toggleProps`, which are passed down to the rendered `Button` that wraps the text contents and toggles the dropdown.
- a React node as the `children`, which will be rendered instead of a `Button` component.
- a `disabled` prop.
