#!/bin/bash

. <(wget -qO- https://raw.githubusercontent.com/f5nodes/root/main/install/node.sh)

npm install pm2 -g
git clone https://github.com/f5nodes/f5checker.git
cd f5checker
npm install
pm2 install typescript
pm2 start index.ts --name "f5checker"