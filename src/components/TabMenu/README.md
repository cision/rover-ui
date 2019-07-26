# TabMenu

1. `<TabMenu>` Controls the flex children and alignment of the tab menu. Any styles/classNames and extra props passed will be passed down
2. `<TabMenu.Item>` Lightly styled inner tab item. `Active` prop automatically adds blue underline, but you will need to add your own padding to the clickable child element (import `itemPadding` for standard padding);
3. `<SimpleTabMenu>` utilizes both of the above, for an out-of-the-box tab menu

## When to use SimpleTabMenu vs customized TabMenu

With `SimpleTabMenu`, you pass an array of objects including a key, label, and onClick event, as well as `activeTab` (which corresponds to one of the array item's keys). If you need the tab item to do anything other than a function (eg. be a NavLink) then you can utilize `TabMenu` with `TabMenu.Item` children.

**BONUS** If a child of TabMenu.Item has a className including "active", it will automatically apply the active styling. So, if you do need a list of NavLinks inside the Tab Menus, you shouldn't have to control which one is active!
