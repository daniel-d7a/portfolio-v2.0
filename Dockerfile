# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM caddy:2-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY Caddyfile /etc/caddy/Caddyfile

ENV PORT=80

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
