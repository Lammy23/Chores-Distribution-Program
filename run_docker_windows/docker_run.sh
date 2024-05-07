#!/bin/bash

cd ..

# Create network
docker network create weekly-chores-network

# Run the frontend
docker run --network weekly-chores-network --name weekly-chores-frontend -p 3000:3000 -d lammy23/weekly-chores-frontend:1.0

# Run the database
docker run --network weekly-chores-network --name weekly-chores-database -p 5433:5432 -d lammy23/weekly-chores-database:1.0

# Run the backend
docker run --network weekly-chores-network --name weekly-chores-api -p 8000:8000 -d lammy23/weekly-chores-api:1.0

# Run the database interface
docker run --network weekly-chores-network --name weekly-chores-database-interface -p 15432:80 -d lammy23/weekly-chores-database-interface:1.0

# Open the frontend in the default web browser
start "" http://localhost:3000
start "" http://localhost:15432/login?next=/

# How to run
# chmod +x run_docker_windows/docker_run.sh
# ./run_docker_windows/docker_run.sh