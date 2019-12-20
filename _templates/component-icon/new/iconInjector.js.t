---
inject: true
to: src/components/Icon/index.js
before: ICON_INJECTOR
skip_if: import <%= h.changeCase.pascal(name) %> from './icons/<%= h.changeCase.pascal(name) %>';
---
import <%= h.changeCase.pascal(name) %> from './icons/<%= h.changeCase.pascal(name) %>';