# Use an official Node.js 20 image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Copy frontend files
COPY frontend/ frontend/

# Copy backend files
COPY backend/ backend/

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Run command to start the application
CMD ["npm", "start"]
