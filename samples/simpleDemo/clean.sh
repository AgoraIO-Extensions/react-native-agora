#!/usr/bin/env bash
rm -rf ios/build && \
watchman watch-del-all && \
rm -rf *-lock.json && rm -rf *.lock && \
rm -rf node_modules && yarn install && \
npm start -- --reset-cache
