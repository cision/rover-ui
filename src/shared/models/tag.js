import PropTypes from 'prop-types';

export const propTypes = PropTypes.oneOfType([
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

export const defaultProps = 'span';

const tag = {
  propTypes,
  defaultProps,
};

export default tag;
