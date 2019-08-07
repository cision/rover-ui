# \<Dropdown\>

The base dropdown is stateless and built for extensibility, not necessarily usability. For most use cases, use `EasyDropdown` (coming soon).

It comes with an open/close prop (`isOpen`) and a callback function for toggling (`onToggle`). That's it. The only styling applied is `position: relative` for positioning whatever menu you add later.

The dropdown family of components also includes a `Dropdown.Menu` that provides a background, a z-index, and an animated transition on toggle. The `Dropdown` component automatically passes down `isOpen` to its children via React's context API, so you don't have to.

**Example with state from the parent component:**

```js
import { Dropdown } from '@cision/rover-ui';

const OpenableDropdown = ({ buttonProps, menuProps, ...passedProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dropdown isOpen={isOpen} onToggle={handleToggle}>
      <button type="button" onClick={handleToggle}>
        Click me
      </button>
      <Dropdown.Menu
        style={{ background: 'white', padding: '20px', width: '100px' }}
      >
        Menu
      </Dropdown.Menu>
    </Dropdown>
  );
};
```
