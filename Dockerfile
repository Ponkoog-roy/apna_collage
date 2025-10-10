# Use official Node.js 18 image
FROM node:18

# Set working directory
WORKDIR /testapp

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Set environment variable
ENV PORT=5000

# Expose app port
EXPOSE 5000

# Command to run the app
CMD ["node", "server.js"]
