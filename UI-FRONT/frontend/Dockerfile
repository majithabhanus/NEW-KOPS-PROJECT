# ---------- Stage 1: Build ----------
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --unsafe-perm

COPY . .
RUN node ./node_modules/vite/bin/vite.js build

# ---------- Stage 2: Nginx ----------
FROM nginx:alpine

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
