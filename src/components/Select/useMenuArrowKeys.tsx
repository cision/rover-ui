import { useCallback } from 'react';

import type { MenuItem } from '../EasyDropdown/EasyDropdown';

const getEnabledMenuItems = (menuItems: MenuItem[]): MenuItem[] =>
  menuItems.filter((item) => !item.disabled);

const getFocusedMenuItem = (menuItems: MenuItem[]) =>
  menuItems.find(
    (item: MenuItem) =>
      (item.forwardedRef?.current as HTMLElement) === document.activeElement
  );

const itemNavigationKeyMap = {
  ArrowUp: -1,
  ArrowDown: +1,
};

function useMenuArrowKeys(menuItems: MenuItem[]) {
  const handleKey = useCallback(
    (e) => {
      const { key } = e;
      if (!itemNavigationKeyMap[key]) return;

      const focusedMenuItem = getFocusedMenuItem(menuItems);
      const enabledItems = getEnabledMenuItems(menuItems);

      if (enabledItems.length < 1) return;
      if (!focusedMenuItem) return;

      const prevSelectionIndex = enabledItems.indexOf(focusedMenuItem);
      let selectionIndex = prevSelectionIndex;
      selectionIndex += itemNavigationKeyMap[key];
      selectionIndex = Math.max(0, selectionIndex);
      selectionIndex = Math.min(enabledItems.length - 1, selectionIndex);

      if (selectionIndex !== prevSelectionIndex) {
        enabledItems[selectionIndex].forwardedRef?.current?.focus();
      }

      e.preventDefault();
      e.stopPropagation();
    },
    [menuItems]
  );

  return handleKey;
}

export default useMenuArrowKeys;
