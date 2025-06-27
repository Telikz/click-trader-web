FROM oven/bun:alpine AS builder

WORKDIR /app

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY

ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

COPY . .

RUN bun install
RUN bun run build

# Runtime stage using Node.js
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy only what's needed to run the server
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json /app/package.json

# Install only production dependencies using npm
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
