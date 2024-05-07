#!/bin/bash

# Create network
docker network create weekly-chores-network

# Build and run the frontend
docker build -t weekly-chores-frontend:1.0 frontend/.
docker run --network weekly-chores-network --name weekly-chores-frontend -p 3000:3000 -d weekly-chores-frontend:1.0

# Build and run the backend
docker build -t weekly-chores-api:1.0 backend/.
docker run --network weekly-chores-network --name weekly-chores-api -p 8000:8000 -d weekly-chores-api:1.0

# Build and run the database
docker build -t weekly-chores-database:1.0 database/.
docker run --network weekly-chores-network --name weekly-chores-database -p 5433:5432 -d weekly-chores-database:1.0

# How to run
# chmod +x docker_run.sh
# ./docker_run.sh