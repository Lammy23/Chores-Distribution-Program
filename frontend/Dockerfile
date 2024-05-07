FROM node:alpine

# Copy everything apart from node_modules
COPY public/ ./weekly-chores-frontend/public
COPY src/ ./weekly-chores-frontend/src
COPY package.json ./weekly-chores-frontend/package.json

# Set working directory
WORKDIR /weekly-chores-frontend/

# Expose the port the app runs in
EXPOSE 3000

# Install dependencies
RUN npm install

CMD [ "npm", "start" ]

# Instructions to run (START HERE)
# docker network create weekly-chores-network
# docker build -t weekly-chores-frontend:1.0 frontend/.
# docker run --network weekly-chores-network --name weekly-chores-frontend -p 3000:3000 -d weekly-chores-frontend:1.0