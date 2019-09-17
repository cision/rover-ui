# \<Avatar\>

Avatar is used for a circular image (usually in relation to a Noun). Often paired with words, but this component is standalone with no additional margins.

### Sizing

You may pass a size (`small`, `medium`, `large`) or a number, which will be the width and height in pixels.

### Display

- If an imageUrl is present, it will display in the circle.
- If no imageUrl but a name is present, the first two initials will display in the circle with a blue background
- If loading is true, it will show a blue background with a shimmer animation

# \<Avatar.Addon\>

Avatar Addon is used as a position block within the avatar. Any node can be wrapped with `Avatar.Addon`, although it will not be useful unless the child of `Avatar`.

Position options are:
`top-left`
`top-right`
`bottom-left`
`bottom-right`

### Offsets

If an offset is set on an Addon, it will move that amount toward the center of the parent Avatar. (Eg. to move it further from the center give it a negative offset).
