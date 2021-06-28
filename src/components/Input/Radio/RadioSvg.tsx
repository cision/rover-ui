import React from 'react';

import styles from './Radio.module.css';

const Svg = ({ title = 'Radio', ...passedProps }) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...passedProps}
  >
    <title>{title}</title>
    <g id="Radio" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <circle
        className={styles.outer}
        id="outer"
        fill="#34404B"
        cx="10"
        cy="10"
        r="10"
      />
      <path
        className={styles.outline}
        d="M10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 Z M10,18 C14.418278,18 18,14.418278 18,10 C18,5.581722 14.418278,2 10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 Z"
        id="outline"
        fill="#34404B"
      />
      <circle
        className={styles.inner}
        id="inner"
        fill="#DF7171"
        cx="10"
        cy="10"
        r="5"
      />
    </g>
  </svg>
);

export default Svg;
