# Architecture

> *"Meaningful architecture is a living, vibrant process of deliberation, design, & decision, not just documentation."*
>
> **-- Grady Booch**

This project follows the [Vue.js Style Guide](https://vuejs.org/v2/style-guide/), as well as [other suggested guidelines](https://itnext.io/how-to-structure-a-vue-js-project-29e4ddc1aeeb) for architecting Vue projects.

## Structure

```bash
.
├── .github                         # github templates
├── .vscode                         # shared VSCode settings
├── bin                             # bash scripts too complex for npm-scripts
├── blueprints                      # templates used by vue-generator
├── build                           # webpack build config files
├── docs                            # detailed documentation
├── scripts                         # utility node scripts used to aide development
├── src                             # app source files
│   ├── assets                          # static app assets
│   ├── components                      # single-file Vue components
│   ├── directives                      # custom Vue directives
│   ├── lib                             # .js files used in Vue components
│   ├── store                           # the app store, using Vuex
│   └── views                           # Vue components that represent a page-wrapper
├── static                          # static assets bundled with the built application
└── test                            # app test files
    ├── __mocks__                       # mocks used for testing
    ├── accessibility                   # tests for accessibility
    ├── e2e                             # end-to-end tests
    └── unit                            # unit-tests
```

<!-- tree -d -I node_modules -I coverage -L 2 --noreport -->
