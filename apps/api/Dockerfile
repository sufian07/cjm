# Dockerfile for api application (Nest.js)

# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy pnpm lockfile
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Copy package.json files
COPY package.json ./
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --prod=false

# Copy the rest of the monorepo source
COPY . .

# Change ownership of node_modules
RUN chown -R node:node /usr/src/app/node_modules

# Switch to a non-root user
USER node

# Expose port 3001
EXPOSE 3001

# Start the development server
CMD ["pnpm", "--filter", "api", "run", "start:dev"]
