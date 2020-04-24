#!/usr/bin/env bash

node compile.js "index/data.json" "templates/index.hbs"
deploy="false"
onlyindex="true"

[ "$1" == "deploy" ] && deploy="true"

cp -r css js media build/
cp sw-init.js service-worker.js build/
cp manifest.json build/

[ "$?" != "0" ] && exit 1

if [ "$deploy" == "true" ]; then
	scp -r build/* photogrammetrie.online:photogrammetrie.online/
elif [ "$onlyindex" == "true" ]; then
	scp build/index.html photogrammetrie.online:photogrammetrie.online/
fi
