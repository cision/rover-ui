import React from 'react';

import styles from './Checkbox.module.css';

const svg = ({ title = 'Checkbox', ...passedProps }) => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 18 18"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...passedProps}
  >
    <title>{title}</title>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <polygon
        className={styles.outline}
        fill="#34404B"
        points="0 0 18 0 18 18 0 18"
      />
      <polygon
        className={styles.inner}
        fill="#34404B"
        points="16 16 16 2 2 2 2 16"
      />
      <polygon
        className={styles.check}
        fill="#34404B"
        points="7 14 2 9 3.41 7.59 7 11.17 14.59 3.58 16 5"
      />
      <polygon
        className={styles.dash}
        fill="#34404B"
        points="14 10 4 10 4 8 14 8"
      />
    </g>
  </svg>
);

export default svg;
