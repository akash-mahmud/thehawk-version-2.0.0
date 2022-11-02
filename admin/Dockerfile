FROM  node:16-alpine3.15 as builder
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build


FROM nginx
EXPOSE 3001
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

