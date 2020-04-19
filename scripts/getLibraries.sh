#!/usr/bin/env bash

rootDir=$(git rev-parse --show-toplevel)

mkdir -p "$rootDir/css/" "$rootDir/js/"

wget -P "$rootDir/css/" "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
wget -P "$rootDir/js/" "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"
wget -P "$rootDir/js/" "https://code.jquery.com/jquery-3.4.1.slim.min.js"
