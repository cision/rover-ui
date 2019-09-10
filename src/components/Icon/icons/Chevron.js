import React from 'react';

const Chevron = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <polygon
      fill="currentColor"
      fillRule="nonzero"
      transform="rotate(90 12 12)"
      points="10 6 8.59 7.41 13.17 12 8.59 16.59 10 18 16 12"
    />
  </svg>
);

export default Chevron;
