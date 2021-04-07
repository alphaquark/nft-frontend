FROM node:12.16.3 AS builder

WORKDIR /home/node
COPY --chown=node:node . .

USER node

RUN yarn install
RUN yarn build

FROM nginx:mainline-alpine

COPY --from=builder /home/node/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443