---
inject: true
to: src/stories/index.js
before: INJECTOR
skip_if: ../components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.story.tsx
---
import '../components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.story.tsx';