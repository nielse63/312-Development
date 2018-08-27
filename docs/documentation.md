# Documentation

> *"I basically wrote the code and the specs and documentation for how the client and server talked to each other."*
>
> **-- Tim Berners-Lee**

I try to keep thorough, up-to-date documentation on this project - it helps me think though my processes and question my own assumptions. The goals for documenting my portfolio site in such detail are the following:

1. I want to ensure the processes, tools, and technologies used can be implemented again without issue.
2. To demonstrate my knowledge and understanding of the source code (basically an anti-copy-pasta initiative).
3. To share my successes and failures, in the hope that someone repeats the former, and learns from the latter.

Documentation is primarily found in the `docs/` directory of the repo, and aims to cover:

- Development Processes
- Scripts, Tools, and Automation
- Project Architecture
- Testing
- CI/CD Pipelines
- Third-Party Integrations

## Automation

In order to keep my docs up to date, I've created a node script to insert markdown variables where needed, update the directory tree, and more.

You can read the full details of this script in the [`scripts/docs`](../scripts/docs) directory.

## Linting

I use [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli/) to lint my documentation. This is to ensure the information I'm publishing meets basic community standards of quality, and no errors are found in the wild.

## Reporting Docs Issues

If you do find an issue in the documentation, please let me know by [creating a new issue in GitHub](https://github.com/nielse63/312-Development/issues/new?template=documentation-error.md&labels=documentation).
