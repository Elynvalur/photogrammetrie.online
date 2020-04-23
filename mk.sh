#!/usr/bin/env bash

node compile.js "index/data.json" "templates/index.hbs"
deploy="false"

[ "$1" == "deploy" ] && deploy="true"
[ "$?" != "0" ] && exit 1

cp -r css js media build/
cp sw-init.js service-worker.js build/
cp manifest.json build/

if [ "$deploy" == "true" ]; then
	scp -r build/* photogrammetrie.online:photogrammetrie.online/
fi
