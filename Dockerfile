# Stage 1 (BUILD)
FROM node:lts-alpine AS builder
WORKDIR /app
COPY ./app .

# Stage 2 (RUN)
FROM nginx:alpine
COPY --from=builder /app /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]