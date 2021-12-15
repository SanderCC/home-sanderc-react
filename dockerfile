# BUILD IMAGE
FROM node:16-alpine as build-stage

WORKDIR /app

# Install dependencies
COPY ./project/package*.json ./
RUN npm install

# Build
COPY ./project .
RUN npm run build

# -----------------------------------------------------------------------------
# SERVING IMAGE
FROM fitiavana07/nginx-react

# Copy built files
COPY --from=build-stage /app/build /usr/share/nginx/html

# 80 for HTTP
EXPOSE 80

# Run nginx
CMD nginx -g 'daemon off;'