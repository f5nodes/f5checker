#!/bin/bash

. <(wget -qO- https://raw.githubusercontent.com/f5nodes/root/main/install/node.sh)

npm install pm2 -g
pm2 install typescript
git clone https://github.com/f5nodes/f5checker.git
cd f5checker
npm install
pm2 install typescript

mkdir logs
nohup bash update.sh > logs/update.log &

pm2 start index.ts --name "f5checker"
pm2 log