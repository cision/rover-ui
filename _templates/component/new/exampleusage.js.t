---
inject: true
to: example/src/App.js
before: USAGE_INJECTOR
skip_if: <h1><%= h.changeCase.pascal(name) %></h1>
---
      <Section title="<%= h.changeCase.pascal(name) %>">
        <<%= h.changeCase.pascal(name) %> />
      </section>