#!/usr/bin/env bash

node compile.js "index/data.json" "templates/index.hbs"

scp -r css js build/
scp -r build/* photogrammetrie.online:photogrammetrie.online/
