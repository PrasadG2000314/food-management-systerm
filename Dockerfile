# ==========================================
# AgriBridge - Production Multi-Stage Dockerfile
# Stage 1: Build Frontend Assets
# Stage 2: Express Server & Static Serving
# ==========================================

FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (needed for Vite build)
RUN npm install

# Copy source files
COPY . .

# Build the production frontend distribution
RUN npm run build

# ==========================================
# Stage 2: Production Runtime
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy package manifests
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy backend files & seed data
COPY server/ ./server/

# Copy built frontend assets from builder stage
COPY --from=builder /app/dist ./dist

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start backend server
CMD ["node", "server/index.js"]
