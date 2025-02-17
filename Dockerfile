# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code (ensure you have a build script in your package.json)
# RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install

# Copy the built JavaScript files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port your app listens on (adjust if necessary)
EXPOSE 3000

# Start the application (update the path if your output file differs)
CMD ["node", "dist/index.js"]