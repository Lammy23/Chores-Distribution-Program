# Use an official PostgreSQL runtime as a parent image
FROM postgres:alpine

# Set the working directory in the container to /docker-entrypoint-initdb.d
WORKDIR /docker-entrypoint-initdb.d

# remember to set host to host.docker.internal in dbConfig.js

# Copy the current directory contents into the container at /docker-entrypoint-initdb.d
# The psql-create-database.sql runs when the container launches
COPY psql-create-database.sql /docker-entrypoint-initdb.d

# Make port 5432 available to the world outside this container
EXPOSE 5432

# Instructions to run (END HERE)
# docker build -t weekly-chores-database:1.0 database/.
# docker run --network weekly-chores-network --name weekly-chores-database -p 5433:5432 -d weekly-chores-database:1.0