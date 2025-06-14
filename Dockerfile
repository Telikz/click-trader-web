FROM oven/bun:alpine as builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

FROM oven/bun:alpine as runtime

WORKDIR /app

COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json /app/package.json

RUN bun install --production

EXPOSE 3000

CMD ["bun", "run", ".output/server/index.mjs"]
