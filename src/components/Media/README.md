# Media Object

The `<Media>` Dark Matter object is a useful tool to create consistent layout behavior. It originally came about from Nicole Sullivan's use of Object-Oriented CSS to cleanup media object display on Facebook. [Here is her original article with classic float-based CSS](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)

This took hold as a standard pattern and appeared in frameworks such as Bootstrap and Foundation.

## Media

The `<Media>` is a basic wrapper that sets up a basic flex style that makes creating basic layout much easier. By itself, it doesn't do much. For example:

```jsx
<Media>
  <Paper>Just displays a "Paper"</Paper>
</Media>
```

## Items and Body

These two components are the bread and butter of the Media object. When you use `<Media>`, you will want to use `<Media.Item>` and `<Media.Body>` the majority of the time as direct children to make sure that the proper flex/grid CSS styling is used.

There is only one major difference between these two compoents: a `Media.Body` component will fill the available space while `Media.Item` will shrink to fit.

For example

```jsx
<Media>
  <Media.Item>Item 1</Media.Item>
  <Media.Item>Item 2</Media.Item>
  <Media.Body>Body</Media.Body>
  <Media.Item>Item 3</Media.Item>
  <Media.Item>Item 4</Media.Item>
</Media>
```

## Nesting

You can nest media objects as deeply as you want and the layout/spacing will be maintained.

```jsx
<Media>
  <Media.Item>Item 1</Media.Item>
  <Media.Body>
    <Paper>You can have anything in a `Media.Body` component

    <Media>
      <Media.Item>Nested Item 1</Media.Item>
      <Media.Body>
        Including another `Media` object!
      </Media.Body>
    </Media>
  </Media.Body>
</Media>
```
