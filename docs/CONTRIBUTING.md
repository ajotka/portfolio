# Contributing

🎉 First of all, thanks for taking the time to contribute! 🎉

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Table of Contents

- [Setting Up the project locally](#setting-up-the-project-locally)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Setting Up the project locally

To install the project you need to have `node` and `npm` (or `yarn`)

1.  [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone
    your fork.

2.  From the root of the project: `npm` to install all dependencies

3.  from the root of the project: `npm start` to run the cli.

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. 
>
> This will add the original repository as a "remote" called "upstream," then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Submitting a Pull Request

Please go through existing issues and pull requests to check if somebody else is already working on it.

Also, make sure to lint the code before you commit your
changes.

```sh
npm run lint:css
npm run lint:js
```
