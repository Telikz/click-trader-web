FROM node:24.3.0-alpine3.22 AS builder

WORKDIR /app

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY

ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:24.3.0-alpine3.22 AS runtime

WORKDIR /app

COPY --from=builder /app/package.json /app/package.json

RUN npm install --omit=dev

COPY --from=builder /app/.output /app/.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
