# `@312dev/api-server`

> API server gateway for 312development.com

## Development

### Getting Started

From within the 312-Development project root:

```bash
lerna bootstrap         # installs all dependencies
cd packages/api-server  # move into package dir
yarn serve              # spin up dev server
```

### Scripts

| Script       | Description                                  |
| :----------- | :------------------------------------------- |
| `yarn serve` | Starts the dev server - used for development |
| `yarn start` | Spins up production server                   |

## Testing

Testing is not being run on this package as of yet, but that is in the roadmap

## Deployment

Deployment is automated using [Travis' Build Stages](https://docs.travis-ci.com/user/build-stages/). See the [`.travis.yml`](https://github.com/nielse63/312-Development/blob/master/.travis.yml) config file for more info/details.

## Roadmap

- [ ] Write tests
