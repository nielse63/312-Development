# Code Quality

> *"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."*
>
> **–- Martin Golding**

Code quality is guaranteed through a combination of tools and automation scripts which are used to enforce pre-established styleguides and standards of quality.  Ultimately, the goal is ensure the project is easy to maintain and work on.

## Usage

| Script           | Description                                                                                                                           |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `yarn lint:js`   | Lints the `.js` and `.vue` files using [eslint](https://eslint.org/)                                                                  |
| `yarn lint:scss` | Lints all `.scss` files, as well as the style in Vue SFCs, using [stylelint](https://stylelint.io/)                                   |
| `yarn lint:md`   | Runs [markdownlint](https://www.npmjs.com/package/markdownlint-cli) against `.md` doc files                                           |
| `yarn duplicate` | Searches for duplicate and structurally similar code in `src/**/*.js` files with [jsinspect](https://www.npmjs.com/package/jsinspect) |

Files are also linted before they are checked into the repo using [lint-staged](https://www.npmjs.com/package/lint-staged) and [yorkie](https://www.npmjs.com/package/yorkie).

## Pertinent File

```bash
.
│   # module config files
├── .eslintrc.js
├── .jsinspectrc
├── .lintstagedrc
├── .mdlrc
├── .stylelintrc.js
│
│   # ignore files
├── .eslintignore
└── .stylelintignore
```

## Resources / Further Reading

### eslint

- [eslint](https://eslint.org/)
- [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
- [eslint-import-resolver-webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn)
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)

### stylelint

- [stylelint](https://stylelint.io/)
- [stylelint-config-recommended-scss](https://www.npmjs.com/package/stylelint-config-recommended-scss)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)

### Others

- [markdownlint-cli](https://www.npmjs.com/package/markdownlint-cli)
- [lint-staged](https://www.npmjs.com/package/lint-staged)
- [jsinspect](https://www.npmjs.com/package/jsinspect)
