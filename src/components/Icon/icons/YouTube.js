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
        d="M12.27 5c1.138.007 5.543.053 6.762.403.775.222 1.385.875 1.592 1.705C21 8.612 21 11.75 21 11.75s0 3.138-.376 4.642c-.207.83-.817 1.483-1.592 1.705C17.63 18.5 12 18.5 12 18.5s-5.629 0-7.032-.403c-.775-.222-1.385-.875-1.592-1.705-.324-1.297-.369-3.807-.375-4.475v-.334c.006-.668.05-3.178.375-4.475.207-.83.817-1.483 1.592-1.705 1.219-.35 5.624-.396 6.762-.402zm-2.11 3.92v5.66l4.704-2.83-4.705-2.83z"
      />
    </svg>
  );
};

YouTube.propTypes = { fill: PropTypes.string };
YouTube.defaultProps = { fill: iconColorsMap.youtube };

export default YouTube;
