# EasyPill

Easy pills are more opinionated than basic pills, to make it easy to get started on the most common use cases.
They take an `actions` prop that's an array of objects.
Each object has, at least, a callback function (`onClick`) and a text label (`label`).

Easy pills show those action labels in a list. Each one fires its callback function when clicked.
Easy pill actions may also have `children` props, in which case they'll render the `children` as a React node instead of the label. You still need to provide a unique text label, though, for use as an identifying key.

Easy pills come with a delete action by default. If you provide an `onDelete` function as a prop, it will show up automatically.

Easy pills show a tooltip in delete action. If you provide an `onDelete` functions as a prop and `tooltip` prop but no `actions`.

**TODO**: The easy pill's actions should be in a small dropdown with an ellipsis icon that triggers it.

## Examples

`EasyPill` provides dropdown logic, but the consuming component is still responsible for `isChecked` and `setIsChecked`.

```jsx
<EasyPill
  actions={[
    {
      label: 'Boom',
      onClick: action('Boom'),
    },
    {
      label: 'Bang',
      onClick: action('Bang'),
    },
  ]}
  checked={isChecked}
  onClick={() => setIsChecked(!isChecked)}
  onDelete={action('onDelete')}
>
  With actions and onDelete
</EasyPill>

<EasyPill
  actions={[
    {
      label: 'Boom',
      onClick: action('Boom'),
    },
    {
      label: 'Bang',
      onClick: action('Bang'),
    },
  ]}
  checked={isChecked}
  onClick={() => setIsChecked(!isChecked)}
>
  With actions but no onDelete
</EasyPill>

<EasyPill
  checked={isChecked}
  onClick={() => setIsChecked(!isChecked)}
  onDelete={action('onDelete')}
>
  With onDelete but no actions
</EasyPill>

<EasyPill
  checked={isChecked}
  onClick={() => setIsChecked(!isChecked)}
  onDelete={action('onDelete')}
  tooltip="With onDelete but no actions and tooltip"
>
  With onDelete but no actions and tooltip
</EasyPill>

<EasyPill
  checked={isChecked}
  onClick={() => setIsChecked(!isChecked)}
>
  With neither onDelete nor actions
</EasyPill>
```
