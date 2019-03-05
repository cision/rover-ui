import React from 'react';

import styles from './style.css';

const Button = props => <button {...props} className={styles.Button} />;

// default export should be named or else Storybook's
// "Story Source" does not work correctly
export default Button;
