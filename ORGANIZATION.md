# Migration Organization

Currently, there is no clear, definitive organization to our RoverUI component library. Some effort has been made to do this, but it is currently half-baked. The following outline is a starting point of discussion to decide how components are organized and which pieces we should/should not migrate from tk-ui v1 to RoverUI.

> **Disclaimer**: I've left out higher-order components for now. We are still unsure what our best practices and patterns for creating re-usable components is and when to apply them. HOCs will be revisited later.

#### Clarification

## Planet

- Activity Block
- Badge (Done)
- Button
- Floating Panel
- LinkButton\*
- Overlay
- Paper (HOC?) (Done)
- Progress
- RadioButton(? in forms)
- ShimmerText (DNM?)
- Status Bar
- SVGs
- Template string
- Toolbar
- Type

## Star System

- Avatar
- ~~Bar Stat~~ Bar.Bar + Bar.Fill
- Button Group
- Dropdown
- PerformanceMetric(?)
- Pill
- Tooltip
- Toggle
- ScoreMeter(?) (DNM?)
- Status Indicator

## Galaxy

- Accordion List
- Datepicker
- Embedded Video
  - Embedded Video Tile
- Forms
  - Checkbox
  - EmailListControl(?)
  - Error
  - FormGroup
  - FormLabel
  - Input
  - InputFile
  - LargeCheckbox(?)
  - ListControl
  - ListControlDefaultItem
  - MultiLineInput
  - PasswordInput
  - Select
  - SmallCheckbox(?)
  - TextArea
- Grid
  - Grid Table
  - Grid Tile
- Kite
- List
- ListVisor
- Modal
  - Confirm Modal
  - LoadingModal
- Person (DNM?)
- SearchInput(? in forms)
- Selection Tray (DNM?)
- SideTray
- TabMenu
  - Calendar Date Picker
  - Date Range Picker
  - Input Date Picker

## Dark Matter

- Container
- Media (CSS Object. Not reference to media content specifically)
- Page
- ( Side Bar )
  - SideBarCollapse
  - SideBarListItem

## DO NOT MIGRATE

- Bulk Actions
- Empty State
- NavHeader
- SimpleLineChart (it's just empty?!?)
- Sticky
