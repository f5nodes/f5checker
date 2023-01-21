#!/bin/bash

if ! command -v curl &> /dev/null && ! command -v git &> /dev/null; then
    sudo apt install -y curl git
fi

current_version=$(node -e "console.log(require('./package.json').version)")
latest_version=$(curl -s "https://api.f5checker.com/version")
echo "[$(date)] Current v$current_version, latest - v$latest_version"

if [ "$latest_version" != "$current_version" ]; then
    echo "[$(date)] New version $latest_version is detected! Old version: $current_version. Updating..."
    git pull
    npm install
    pm2 restart f5checker
fi