import React from 'react';
import PropTypes from 'prop-types';
import iconColorsMap from './colors';

const YouTube = ({ fill, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill={fill}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M17.66564 5.87384C18 7.21068 18 10 18 10s0 2.78923-.33436 4.12626c-.184.73751-.7261 1.31835-1.41464 1.51558C15.00336 16 10 16 10 16s-5.00336 0-6.2511-.35816c-.68845-.19723-1.23063-.77807-1.41463-1.51558C2 12.78923 2 10 2 10s0-2.78932.33427-4.12616c.184-.73761.72618-1.31845 1.41464-1.51558C4.99664 4 10 4 10 4s5.00336 0 6.251.35826c.68855.19713 1.23064.77797 1.41464 1.51558zm-9.30203 6.6423l4.18182-2.51602L8.3636 7.48389v5.03226z"
      />
    </svg>
  );
};

YouTube.propTypes = { fill: PropTypes.string };
YouTube.defaultProps = { fill: iconColorsMap.youtube };

export default YouTube;
