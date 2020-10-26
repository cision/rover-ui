## Publishing a new version

To publish the npm package, you'll need an [npm](https://www.npmjs.com/) account, and you'll need to be added to the list of maintainers by one of the current RoverUI maintainers.

### With write access

1. Checkout a release branch of some kind: (e.g. `release-2.0.4` or `new-v2.1.4`)
2. **Following [semver](https://semver.org)** as your version guide, use the script `yarn new-version [value]` to bump the version. See [`yarn version`](https://classic.yarnpkg.com/en/docs/cli/version/) docs for more info
   1. For `patch`: `yarn new-version --patch`
   2. For `minor`: `yarn new-version --minor`
   3. For `major`: `yarn new-version --major`
   4. For other: `yarn new-version --new-version 3.4.11`
3. Open a PR for that branch
4. Once you have at least one PR approval from an admin and no pending requests for changes, you can merge in to master.
5. After your pull request is merged, follow this process:
   1. `git checkout master && git fetch -p && git reset --hard origin/master`
   2. `yarn publish`
6. Ask an admin to push your new version's tag to GitHub.

### With admin access

If you're an [admin](https://github.com/cision/rover-ui/settings/access), you can commit directly to `master`. The process is much more streamlined.

1. Reset your master: `git checkout master && git fetch -p && git reset --hard origin/master`
2. `yarn version --patch` (or whatever version bump you are making)
3. `yarn publish` (also pushes new tag to GitHub)

### Drafting a release

After your tag is published, you should create a GitHub release from it.

1. Find your [tag](https://github.com/cision/rover-ui/tags), and compare it to the previous version by tag. [Here's an example.](https://github.com/cision/rover-ui/compare/v2.4.5...v2.4.6)
2. From the [Releases](https://github.com/cision/rover-ui/releases) page, draft a new release.
3. The title should be the same as the tag name, i.e. "v3.0.0"
4. The description should be broken out into sections matching the [conventional commit types](https://www.conventionalcommits.org/en/v1.0.0-beta.4/), i.e. "Breaking changes", "Features", "Fixes", etc.
5. You should be able to copy the list of features, fixes, etc. from the [changelog](https://github.com/cision/rover-ui/blob/master/CHANGELOG.md), assuming your deploy followed the instructions.
6. Ideally, the commits should be human-readable and clear, but you may want to do some light editing.
7. When you're satisfied, publish the release.

## Publishing Storybook

By default, our Storybook docs are published automatically using ![Github Actions](.github/workflows/gh-pages.yml). If there is an issue with this release or you need to publish this manually, use the following command:

```sh
yarn storybook:deploy
```
