import PropTypes from 'prop-types';
import isError from 'lodash/isError';

export const combinePropTypes = (...propTypes) => (...args) => {
  for (let i = 0; i < propTypes.length; i += 1) {
    const result = propTypes[i](...args);
    if (isError(result)) {
      return result;
    }
  }
};

export const tagPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string,
  PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
  PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
      PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    ])
  ),
]);

const propTypes = {
  combinePropTypes,
  tagPropType,
};

export default propTypes;
