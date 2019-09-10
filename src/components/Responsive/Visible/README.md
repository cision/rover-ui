# Responsive.Visible

**Shows contents based on container width.**

When you use a `Responsive.Container`, it sets up a container width watcher with pre-defined breakpoints.
You can use those breakpoints to show this component based on container width.

```
<Responsive.Visible
  breakpoints={[
    'container-xs-only',
    'container-md-only',
  ]}
>
  I'll appear at certain sizes
</Responsive.Visible>
```
