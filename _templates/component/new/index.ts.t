---
to: src/components/<%= h.changeCase.pascal(name) %>/index.ts
unless_exists: true
---
export { default } from './<%= h.changeCase.pascal(name) %>';