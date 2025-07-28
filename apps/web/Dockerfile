# Dockerfile for web application (Next.js)

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
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --prod=false

# Copy the rest of the monorepo source
COPY . .

# Change ownership of node_modules
RUN chown -R node:node /usr/src/app/node_modules

# Switch to a non-root user
USER node

# Expose port 3000
EXPOSE 3000

# Start the development server
CMD ["pnpm", "--filter", "web", "run", "dev"]
