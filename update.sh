#!/bin/bash
current="$(dirname ${0})";
cd $current
#git add --all
#git commit -m "update auto commit"
unset GIT_DIR
git pull origin master
npm install