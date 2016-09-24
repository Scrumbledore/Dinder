#!/bin/sh
# After install
echo After Install
pm2 stop all
npm install
pm2 start /opt/codedeploy-agent/app/dinder/server/index.js