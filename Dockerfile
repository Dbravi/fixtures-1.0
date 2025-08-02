# Use official Playwright image with browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.54.1-noble

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./

RUN npm pkg delete scripts.prepare

RUN npm ci

# Copy the rest of your app code
COPY . .

# Default command to run tests
CMD ["npx", "playwright", "test", "--reporter=html,list,quiet"]
