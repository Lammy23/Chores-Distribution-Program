#!/bin/bash

cd ..

# run docker-compose
docker-compose up -d

# Open the frontend in the default web browser
start "" http://localhost:3000
start "" http://localhost:15432/login?next=/

# How to run
# chmod +x run_docker_windows/docker_run.sh
# ./run_docker_windows/docker_run.sh
