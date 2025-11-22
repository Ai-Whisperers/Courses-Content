FROM node:20-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages
RUN npm install -g \
    typescript \
    ts-node \
    jest \
    @playwright/test

# Set working directory
WORKDIR /app

# Default command
CMD ["bash"]
