---
inject: true
to: src/stories/index.js
after: INJECTOR
skip_if: ../components/<%= h.changeCase.pascal(name) %>/story
---
import '../components/<%= h.changeCase.pascal(name) %>/story';
