---
inject: true
to: example/src/App.js
before: IMPORT_INJECTOR
skip_if: <%= h.changeCase.pascal(name) %>,
---
  <%= h.changeCase.pascal(name) %>,