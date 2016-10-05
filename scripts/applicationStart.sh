#!/bin/sh
# Applicaiton Start install
pm2 start /opt/codedeploy-agent/app/dinder/server/index.js
pm2 restart all
