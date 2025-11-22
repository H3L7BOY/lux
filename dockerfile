FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY . .
VOLUME ["/app/core/auth", "/app/db"]
CMD ["node", "core/index.js"]