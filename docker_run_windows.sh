#!/bin/bash

# Stop and remove existing containers
docker-compose down

# run docker-compose
docker-compose up -d

# Open the frontend in the default web browser
start "" http://localhost:3000
start "" http://localhost:15432/login?next=/

# How to run
# chmod +x docker_run_windows.sh
# ./docker_run_windows.sh
