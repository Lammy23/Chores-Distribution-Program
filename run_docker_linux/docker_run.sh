#!/bin/bash

cd ../

# Stop and remove existing containers
docker-compose down

# run docker-compose
docker-compose up -d

# Open the frontend in the default web browser
xdg-open http://localhost:3000
xdg-open http://localhost:15432/login?next=/

# How to run
# chmod +x run_docker_linux/docker_run.sh
# ./run_docker_linux/docker_run.sh
