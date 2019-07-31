# Pill

Pills are usually small badge-ish, button-ish indicators.

They usually:

- hold a short piece text information
- appear in lists of similar information
- are interactive.

Simple pill

```jsx
<Pill>Tag Name</Pill>
```

Checked pill, with action

```jsx
<Pill checked onClick={() => handleOnClick()}>
  Tag Name
</Pill>
```

### Pill.Addon

The `Pill.Addon` is used for `Pill` children other than the text, such as icons. A Pill.Addon may have an independent click area and action associated with it. It can also merely be a visual indicator of selected state (a checkmark, for instance) or a visual reinforcement of the general action associate with a Pill click (a delete icon).

The `Pill.Addon` component can wrap any kind of node.
It allows the `Pill` to coordinate vertical alignment
and horizontal margins between the `Pill.Addon`s and their
siblings with CSS.

Simple pill addon

```jsx
<Pill>
  Tag Name
  <Pill.Addon>{icon}</Pill.Addon>
</Pill>
```

Pill, with independent action

```jsx
<Pill checked onClick={() => handleOnClick()}>
  Tag Name
  <Pill.Addon
    onClick={e => {
      e.stopPropagation();
      handleOnClickAddon(e);
    }}
  >
    {icon}
  </Pill.Addon>
</Pill>
```
