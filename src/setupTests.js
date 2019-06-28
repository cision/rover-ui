// setup file
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// ymmv list of camel-cased attributes React supports for dom elements.
// https://reactjs.org/docs/dom-elements.html
const domAttributes = [
  'acceptCharset',
  'accessKey',
  'allowFullScreen',
  'autoComplete',
  'autoFocus',
  'autoPlay',
  'cellPadding',
  'cellSpacing',
  'charSet',
  'classID',
  'className',
  'colSpan',
  'contentEditable',
  'contextMenu',
  'controlsList',
  'crossOrigin',
  'dateTime',
  'encType',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'frameBorder',
  'hrefLang',
  'htmlFor',
  'httpEquiv',
  'inputMode',
  'keyParams',
  'keyType',
  'marginHeight',
  'marginWidth',
  'maxLength',
  'mediaGroup',
  'minLength',
  'noValidate',
  'radioGroup',
  'readOnly',
  'rowSpan',
  'spellCheck',
  'srcDoc',
  'srcLang',
  'srcSet',
  'tabIndex',
  'useMap',
];

export const TestComponent = props => {
  // Don't pass down invalid attributes to <div> to avoid annoying warnings
  const safeProps = Object.entries(props).reduce((result, [key, value]) => {
    if (key.toLowerCase() === key || domAttributes.indexOf(key) >= 0) {
      result[key] = value;
    }

    return result;
  }, {});

  return <div {...safeProps} />;
};

const setupTests = {
  TestComponent,
};

export default setupTests;
