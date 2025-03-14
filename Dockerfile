# Stage 1 (BUILD)
FROM node:lts-alpine AS builder

# inside of image/containaer
WORKDIR /app

COPY ./app/package*.json /app/

RUN npm install

COPY ./app /app

RUN npm run build

# Stage 2 (RUN)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]