# Use Bun's official lightweight image
FROM oven/bun:alpine as builder

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Optional: install dependencies if not already in .output
RUN bun install

# Build the app with Bun and TanStack Start
RUN bun run build --preset bun

# Install just what's needed for running
RUN bun install --production

# Expose the port your app uses
EXPOSE 3000

# Start the app
CMD ["bun", "run", ".output/server/index.mjs"]
