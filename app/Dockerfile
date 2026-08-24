# ===========================
# Stage 1: Build
# ===========================
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (only production)
RUN npm ci --only=production

# Copy app source code
COPY . .

# ===========================
# Stage 2: Run
# ===========================
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app /app

# Expose the port your app listens on
EXPOSE 5000

# Command to run the app
CMD ["node", "server.js"]
