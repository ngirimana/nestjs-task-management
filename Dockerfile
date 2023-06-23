FROM node:19-alpine3.16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your Nest.js application will run
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "run", "start:prod"]
