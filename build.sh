#! /bin/bash

DOCKER_NAME="alicloud-api-server"

docker rmi -f `docker images | grep  "<none>" | awk '{print $3}'`
docker image rm -f docker.local:5000/$DOCKER_NAME
docker build -t docker.local:5000/$DOCKER_NAME .
# docker push docker.local:5000/$DOCKER_NAME

