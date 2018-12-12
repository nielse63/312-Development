# Testing

> *"To those who say that "if you need testing at the end, you're doing it wrong", would you prefer a Boeing, or are you going Air Icarus?"*
>
> **–- Michael Bolton**

## Usage

| Script                 | Description                                |
| :--------------------- | :----------------------------------------- |
| `yarn test:unit`       | Runs unit tests using jest                 |
| `yarn test:e2e`        | Runs end-to-end tests using jest-puppeteer |
| `yarn test:lighthouse` | Executes a lighthouse run                  |
| `yarn test`            | Runs all test tasks                        |

## Unit Tests

### Running Unit Tests

```bash
yarn test:unit
```

### Unit Test Directories

```bash
.
└─ test/
   └─ unit/                       # directory containing all test files
      └─ specs/                   # directory containing all spec files
      └─ utils/                   # directory with, you guessed it, util files
      └─ jest.config.js            # jest config file, used only for unit tests
```

### Unit Test Dependencies

| Dependency                                                     | Description                                     |
| :------------------------------------------------------------- | :---------------------------------------------- |
| [jest](https://jestjs.io/)                                     | Easy-to-use, modern JavaScript testing platform |
| [jest-canvas-mock](https://github.com/hustcc/jest-canvas-mock) | A module used to mock canvas in Jest.           |

## E2E Tests

### Running E2E Tests

```bash
yarn test:e2e
```

### E2E Tests Directories

```bash
.
└─ test/
   └─ e2e/                        # directory containing all spec and config files
      └─ jest.config.js            # jest config file, used only for e2e tests
      └─ jest-puppeteer.config.js  # jest-puppeteer config file
      └─ ...
      └─ *.test.js                # spec files
```

### E2E Test Dependencies

| Dependency                                                      | Description                                     |
| :-------------------------------------------------------------- | :---------------------------------------------- |
| [jest](https://jestjs.io/)                                      | Easy-to-use, modern JavaScript testing platform |
| [Jest Puppeteer](https://github.com/smooth-code/jest-puppeteer) | Run your tests using Jest & Puppeteer           |

## Lighthouse Tests

### Running Lighthouse Tests

```bash
yarn test:lighthouse
```

### Lighthouse Tests Directories

```bash
.
└─ test/
   └─ lighthouse/
      └─ index.js               # programatically runs lighthouse against a given url
```

### Lighthouse Test Dependencies

| Dependency                                                                | Description                                                                                                                 |
| :------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| [lighthouse](https://github.com/GoogleChrome/lighthouse#readme)           | Lighthouse analyzes web apps and web pages, collecting modern performance metrics and insights on developer best practices. |
| [chrome-launcher](https://github.com/GoogleChrome/chrome-launcher#readme) | Launch Google Chrome with ease from node.                                                                                   |
