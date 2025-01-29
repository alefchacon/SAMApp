FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
ARG VITE_APP_PATH_PREFIX
ARG VITE_APP_BACKEND_URL
ENV VITE_APP_PATH_PREFIX $VITE_APP_PATH_PREFIX
ENV VITE_APP_BACKEND_URL $VITE_APP_BACKEND_URL
RUN npm install
RUN npm run build

FROM nginx:1.25.4-alpine-slim as prod
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]