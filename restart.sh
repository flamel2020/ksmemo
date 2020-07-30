#!/bin/bash

docker pull docker.pkg.github.com/flamel2020/ksmemo/image:latest
[ "$(docker ps -f name=ksmemo --format '{{.Names}}')" == "ksmemo" ] && docker rm -f ksmemo
docker run --name ksmemo -p 3001:3000 -d docker.pkg.github.com/flamel2020/ksmemo/image:latest