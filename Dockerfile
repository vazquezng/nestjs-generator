FROM node:10.15.1-alpine

WORKDIR /usr/src/ms

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]