FROM node:alpine as builder

WORKDIR /app
COPY ./tsconfig.json ./
COPY ./yarn.lock ./
COPY ./src ./src
COPY ./public ./public
COPY ./package.json ./
RUN yarn install
RUN yarn run build

FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=builder /app/build /usr/share/nginx/html
# copy config for nginx
COPY docker/nginx.conf  /etc/nginx/conf.d/default.conf
