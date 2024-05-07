FROM node:latest

# Copy everything apart from node_modules
COPY index.js ./weekly-chores-backend/
COPY db.js ./weekly-chores-backend/
COPY dbConfig.js ./weekly-chores-backend/
COPY dbService.js ./weekly-chores-backend/
COPY cronService.js ./weekly-chores-backend/
COPY package.json ./weekly-chores-backend/

# Set working directory
WORKDIR /weekly-chores-backend/

# Expose the port the app runs in
EXPOSE 8000

# Install dependencies
RUN npm install

CMD [ "node", "." ]

# Instructions to run (END HERE)
# docker build -t weekly-chores-api:1.0 backend/.
# docker run --network weekly-chores-network --name weekly-chores-api -p 8000:8000 -d weekly-chores-api:1.0