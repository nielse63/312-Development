# Development

> *"Every good work of software starts by scratching a developer's personal itch"*
>
> **-- Eric S. Raymond**

## Dependencies

This project requires the following executable:

| Executable                        | Version | Installation        |
| :-------------------------------- | :------ | :------------------ |
| [Node.js](https://nodejs.org/en/) | >= 10.x | `brew install node` |
| [Yarn](https://yarnpkg.com/en/)   | >= 1.x  | `brew install yarn` |
| [NPM](https://www.npmjs.com/)     | >= 6.x  | *none*              |

## Installation

Clone the repo and install the dependencies:

```bash
git clone https://github.com/nielse63/312-development.git
cd 312-development/
yarn
```

## Serve the Local Environment

Serve up a dev instance by running:

```bash
yarn serve
```

You can now visit the app at <http://localhost:8080>. This will run the app using webpack-dev-server with hot module replacement enabled, so that any changes you make to the source code will be immediately reflected in the browser.

## Building for Production

To build for production, simply run:

```bash
yarn build
```

This will compile the source assets using webpack, and the plugins defined in the [webpack production configuration](../build/webpack.prod.conf.js).

This command is executed on the deployed application instance in order to serve static assets (see [Deployment](deployment.md) for more details).
