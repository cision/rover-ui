import Container from './Container';
import Context from './Context';
import Element from './Element';
import Grid from './Grid';
import Hidden from './Hidden';
import Visible from './Visible';

type ReponsiveComponent = {
  Container: typeof Container;
  Element: typeof Element;
  Grid: typeof Grid;
  Hidden: typeof Hidden;
  Context: typeof Context;
  Visible: typeof Visible;
};

const Responsive: ReponsiveComponent = {
  Container,
  Context,
  Element,
  Grid,
  Hidden,
  Visible,
};

export default Responsive;
