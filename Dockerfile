FROM oven/bun:alpine as builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build --preset bun

FROM oven/bun:alpine as runtime

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/bun.lockb /app/bun.lockb
COPY --from=builder /app/package.json /app/package.json

# Install only production dependencies
RUN bun install --production

EXPOSE 3000

CMD ["bun", "run", ".output/server/index.mjs"]
