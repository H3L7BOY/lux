FROM node:20-alpine
WORKDIR /app

# Install build deps and app
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy app into image's /app (this will be available in container unless a volume overwrote it)
COPY . .

# Create directories that will be on the mounted volume
# and create symlinks so your app still sees them at /app/core/auth and /app/db
RUN mkdir -p /data/auth /data/db \
 && rm -rf /app/core/auth /app/db 2>/dev/null || true \
 && ln -s /data/auth /app/core/auth \
 && ln -s /data/db /app/db

# Make sure node uses a non-root user if you want (optional)
# RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app /data
# USER app

CMD ["node", "core/index.js"]
