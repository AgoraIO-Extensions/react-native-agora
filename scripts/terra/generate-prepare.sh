#!/usr/bin/env bash
set -e
set -x

# treated as a completely separate project (not even a workspace), create an empty yarn.lock file in it.
touch yarn.lock
rm -rf node_modules
rm -rf .terra
yarn install
rm yarn.lock
