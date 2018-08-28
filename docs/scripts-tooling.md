# Scripts / Tooling

> *"The most powerful tool we have as developers is automation."*
>
> **-- Scott Hanselman**

## NPM Scripts

To see all available npm scripts, check out the [`package.json`](../package.json) file.

### Development Scripts

| Script       | Description                                                  |
| :----------- | :----------------------------------------------------------- |
| `yarn new`   | Generates a new Vue file from a template using vue-generator |
| `yarn serve` | Serves up the app in a development environment               |

### Code Quality

| Script           | Description                                    |
| :--------------- | :--------------------------------------------- |
| `yarn lint:js`   | Lints `.js` files using eslint                 |
| `yarn lint:scss` | Lints `.scss` and `.vue` files using stylelint |
| `yarn lint:md`   | Lints `.md` files using markdownlint           |

### Testing Scripts

| Script                 | Description                                                   |
| :--------------------- | :------------------------------------------------------------ |
| `yarn test:unit`       | Runs unit tests using jest                                    |
| `yarn test:e2e`        | Runs end-to-end tests using jest-puppeteer                    |
| `yarn test:lighthouse` | Uses lighthouse to ensure best practices are being maintained |
| `yarn test`            | Runs all test scripts (unit, e2e, etc.)                       |

### Production Scripts

| Script       | Description                      |
| :----------- | :------------------------------- |
| `yarn build` | Compiles the app for production  |
| `yarn start` | Serves the app using http-server |

## Node Scripts

These files are custom node scripts that automate tasks for development, testing, or releases.

### `create-404.js`

Generates a static 404 error page, inserting `.js` assets generated from a special 404/error webpack configuration.

### `create-unit-tests.js`

Using a template that runs a basic existence test, this script ensures that all Vue components have a unit test associated with them.

### `resize-images.js`

Executed during the `pre-commit` git-hook using lint-staged, this script makes sure that all images are no more than 500px in height. This is to ensure that static assets meet performance benchmarks.
