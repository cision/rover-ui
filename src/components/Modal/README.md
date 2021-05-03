# \<Modal\>

**A configurable Modal component that automatically triggers onClose when escape key is pressed or clicked outside**

This component can be used as a dialog box that slides in from the top.

Below is an example structure of the `<Modal>`

```
<Modal>
  <Modal.Header /> (optional)
  <Modal.Body> --- main content of the modal goes here --- </Modal.Body>
  <Modal.Footer /> (optional)
</Modal>
```

This will render a modal with a header at the top, a footer at the bottom, and a body block that scrolls if the interior content extends outside the height of the parent.
