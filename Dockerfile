# Use official Node.js 18 image
FROM node:18

# Set working directory inside the container
WORKDIR /testapp

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable for the app port
ENV PORT=5000

# Expose the port the app will run on
EXPOSE 5000

# Command to run the app
CMD ["node", "server.js"]
