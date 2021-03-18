#! /bin/bash

DOCKER_NAME="alicloud-api-server"

docker rmi -f `docker images | grep  "<none>" | awk '{print $3}'`
docker image rm -f zyao89/$DOCKER_NAME
docker build -t zyao89/$DOCKER_NAME .
docker push zyao89/$DOCKER_NAME

