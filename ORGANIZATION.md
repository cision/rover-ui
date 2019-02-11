# Migration Organization

Currently, there is no clear, definitive organization to our tk-ui component library. Some effort has been made to do this, but it is currently half-baked. The following outline is a starting point of discussion to decide how components are organized and which pieces we should/should not migrate from tk-ui v1.

> **Disclaimer**: I've left higher-order components for now. We are still unsure what our best practices and patterns for creating re-usable components is and when to apply them. HOCs will be revisited later.

#### Clarification

## Planet

* Activity Block
* Badge
* Button
* Floating Panel
* LinkButton*
* Overlay
* Paper (HOC?)
* Progress
* RadioButton(? in forms)
* ShimmerText (DNM?)
* Status Bar
* SVGs
* Template string
* Toolbar
* Type

## Solar System

* Avatar
* Bar Stat
* Button Group
* Dropdown
* Media
* PerformanceMetric(?)
* Pill
* Tooltip
* Toggle
* ScoreMeter(?) (DNM?)
* Status Indicator

## Galaxy

* Accordion List
* Datepicker
* Embedded Video
  * Embedded Video Tile
* Forms
  * Checkbox
  * EmailListControl(?)
  * Error
  * FormGroup
  * FormLabel
  * Input
  * InputFile
  * LargeCheckbox(?)
  * ListControl
  * ListControlDefaultItem
  * MultiLineInput
  * PasswordInput
  * Select
  * SmallCheckbox(?)
  * TextArea
* Grid
  * Grid Table
  * Grid Tile
* Kite
* List
* ListVisor
* Modal
  * Confirm Modal
  * LoadingModal
* Person (DNM?)
* SearchInput(? in forms)
* Selection Tray (DNM?)
* SideTray
* TabMenu
  * Calendar Date Picker
  * Date Range Picker
  * Input Date Picker

## Dark Matter

* Container
* Page
* ( Side Bar )
  * SideBarCollapse
  * SideBarListItem

## DO NOT MIGRATE

* Bulk Actions
* Empty State
* NavHeader
* SimpleLineChart (it's just empty?!?)
* Sticky