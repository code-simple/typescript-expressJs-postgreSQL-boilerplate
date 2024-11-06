# Use the official Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files
COPY . .

# Transpile TypeScript to JavaScript
RUN npm run build

# Start the server
CMD ["npm", "start"]

# Expose the port your app runs on
EXPOSE 4000
