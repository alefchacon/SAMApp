# Step 1: Use Node.js to build the React app
FROM node:18 AS build

ARG VITE_PATH_PREFIX
ENV VITE_PATH_PREFIX=$VITE_PATH_PREFIX

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use a lightweight web server to serve the built files
FROM nginx:stable-alpine

# Copy the build files from the previous step to NGINX's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
