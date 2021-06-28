# \<Select\>

Add your documentation for the `Select` component here.

## TODOs:

- keyboard arrow control
- validity
- required
- groups
- typeahead to move the cursor
- set default min width 30 characters and max width ??? - get design input
- _Cut line for MVP_
- set default width to the longest item in the list
- Google autocomplete for native select, maybe punt on it for now
- dropdown open position - auto-detect
  - Detect dropdown menu height (max height included) while invisible
  - Scroll current el to middle of dropdown
  - Put menu offset so selected item is over current input
  - if too close to the bottom edge of window, move window up as far as possible without bumping top edge
- multiselect - needs design work on presenting values and checkboxes or another affordance in the dropdown
- New component: searchable with api callback, and preserve the current selections

## TADAs:

- ~autofocus~
- ~placeholder - let it unset value!~
- ~on open, scroll to the active or first element (seems to be automatic with focus fixed)~
- ~focus~
- ~blur~
- ~max-height~
