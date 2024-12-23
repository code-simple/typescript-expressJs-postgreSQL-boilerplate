# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Copy the rest of the application files
COPY . .

# Install typescript globally
RUN npm install -g typescript

# Install dependencies (including dev dependencies)
RUN npm install 

# Build the TypeScript code
RUN npm run build

# Install pm2 globally
RUN npm install -g pm2

# Expose the port your app runs on
EXPOSE 4000

# Start the application using pm2
CMD ["pm2-runtime", "ecosystem.config.json"]
