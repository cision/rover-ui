import PropTypes from 'prop-types';

export const propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.shape().isRequired,
  fonts: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  fontSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  radii: PropTypes.arrayOf(PropTypes.number).isRequired,
  space: PropTypes.shape().isRequired,
};

const theme = {
  propTypes,
};

export default theme;
