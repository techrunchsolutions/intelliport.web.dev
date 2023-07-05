### STAGE 1: Build ###
FROM node:18-alpine AS build

# Make /app as working directory
WORKDIR /usr/src/app

COPY / ./
# Copy package.json file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps && \
    npm install -g @angular/cli  

# Copy the source code to the /app directory
COPY . .

# Build the application
RUN npm run build -- --configuration production

### STAGE 2: Run ###
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

#Make Directory for ssl cert
RUN mkdir -p /etc/nginx/ssl

# Cope the cert files
COPY certificate.cert /etc/nginx/ssl
COPY private.key /etc/nginx/ssl
COPY bundle.cert /etc/nginx/ssl
# Copy nginx config file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy dist folder fro build stage to nginx public folder
COPY --from=build /usr/src/app/dist/intelliport /usr/share/nginx/html
EXPOSE 80
EXPOSE 443

# Start NgInx service
CMD ["nginx", "-g", "daemon off;"]
