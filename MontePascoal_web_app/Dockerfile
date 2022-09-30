FROM node:16.13.0 as build 

WORKDIR /app
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn cache clean && yarn --update-checksums
RUN yarn
COPY . .
RUN yarn build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]