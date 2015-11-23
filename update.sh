#!/bin/bash
current="$(dirname ${0})";
cd $current
#git add --all
#git commit -m "update auto commit"
unset GIT_DIR
git pull origin master
/root/server/node-v5.0.0-linux-x64/bin/npm install