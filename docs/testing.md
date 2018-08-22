# Testing

## Unit Tests

...

## Integration Tests

...

## E2E Tests

### How to Run

```bash
yarn test:e2e
```

### Pertinent Files

```bash
.
└─ test/
   └─ e2e/                        # directory containing all spec and config files
      └─ jest.config.js            # jest config file, used only for e2e tests
      └─ jest-puppeteer.config.js  # jest-puppeteer config file
      └─ ...
      └─ *.test.js                # spec files
```

### Dependencies

| Dependency                                                      | Version                                         |
| :-------------------------------------------------------------- | :---------------------------------------------- |
| [Jest](https://jestjs.io/)                                      | Easy-to-use, modern JavaScript testing platform |
| [Jest Puppeteer](https://github.com/smooth-code/jest-puppeteer) | Run your tests using Jest & Puppeteer           |
