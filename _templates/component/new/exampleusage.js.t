---
inject: true
to: example/src/App.js
before: USAGE_INJECTOR
skip_if: <h1><%= h.changeCase.pascal(name) %></h1>
---
      <section>
        <h1><%= h.changeCase.pascal(name) %></h1>
        <<%= h.changeCase.pascal(name) %> />
      </section>