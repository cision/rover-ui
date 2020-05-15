---
to: src/components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.css
unless_exists: true
---
.<%= h.changeCase.pascal(name) %> {
  visibility: visible;
}