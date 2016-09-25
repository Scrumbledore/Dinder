#!/bin/sh
# After install
echo After Install
pm2 kill all
pwd
cd app/dinder/
sudo npm install
pm2 start /opt/codedeploy-agent/app/dinder/server/index.js
# pm2 restart all