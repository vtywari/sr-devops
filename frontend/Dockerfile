# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Serve the built application using a static server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 5000
