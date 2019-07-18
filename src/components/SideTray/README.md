# <SideTray>

**A configurable slide-out tray component that automatically triggers onClose when escape key pressed or clicked outside**

This component is used for a full-height dialog box that slides from the right. A <SideTray> can be used on its own (and filled with custom children), but best results are to use the following structure:

```
<SideTray>
  <SideTray.Header /> (optional)
  <SideTray.Body> --- main content here --- </SideTray.Body>
  <SideTray.Footer /> (optional)
</SideTray>
```

This will result in a header that is always at the top, a footer that is always at the bottom, and a body block that scrolls if the interior content extends outside the height of the parent. If you'd like a header or footer that scrolls with the overflow content, you can easily add that within the <SideTray.Body> component.

Width is currently fixed at 400px but would be great for that to be a prop in the future.
