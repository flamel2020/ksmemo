echo "watcher is started at $(date)" >> watcher.log
nohup ./watcher.js 2>&1 >> watcher.log &