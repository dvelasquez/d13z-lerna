#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

release () {
  echo "Releasing new version to NPM"
  git checkout "$TRAVIS_BRANCH"
  git reset --hard
  npm run lerna:release --yes
  npm run lerna:publish --yes
}

release_canary () {
  echo "Releasing new version to NPM"
  git checkout "$TRAVIS_BRANCH"
  git reset --hard
  npm run lerna:release:canary
  npm run lerna:publish:canary
}

if [[ "$TRAVIS_BRANCH" = "master" && "$TRAVIS_PULL_REQUEST" = "false" ]]; then
  setup_git
  release
fi
# The following script will only run for the branch "build/ci", so we can test our changes
if [[ "$TRAVIS_BRANCH" = "build/ci" && "$TRAVIS_PULL_REQUEST" = "false" ]]; then
  setup_git
  release
fi
