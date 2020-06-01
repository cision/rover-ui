---
inject: true
to: src/index.ts
append: true
skip_if: ./components/<%= h.changeCase.pascal(name) %>
---
export { default as <%= h.changeCase.pascal(name) %> } from './components/<%= h.changeCase.pascal(name) %>';