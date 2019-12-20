---
inject: true
to: src/components/Icon/index.js
before: NAME_INJECTOR
skip_if: <%= h.changeCase.pascal(name) %>;
---
  <%- h.changeCase.param(name) === h.changeCase.camel(name) ?  h.changeCase.lower(name) : `'${h.changeCase.param(name)}'`%>: <%= h.changeCase.pascal(name) %>,