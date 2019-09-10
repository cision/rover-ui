# Responsive.Hidden

**Hide contents based on container width.**

When you use a `Responsive.Container`, it sets up a container width watcher with pre-defined breakpoints.
You can use those breakpoints to hide this component based on container width.

```
<Responsive.Hidden
  breakpoints={[
    'container-xs-only',
    'container-md-only',
  ]}
>
  I'll appear at certain sizes
</Responsive.Hidden>
```
