# Use an official Node.js 20 image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run command to start the application
CMD ["npm", "start"]
