#!/bin/bash
# Stop and remove existing containers
docker compose down

# run docker-compose
docker compose up -d --build

# Open the frontend in the default web browser
xdg-open http://localhost:3000
xdg-open http://localhost:15432/login?next=/

# How to run
# chmod +x docker_run_linux.sh
# ./docker_run_linux.sh
