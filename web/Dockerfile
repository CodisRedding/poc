FROM node:4.8.0-slim

WORKDIR /app

RUN npm install nodemon webpack -g
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls
RUN mv /app/node_modules /node_modules

ADD . /app

ENV port=80
EXPOSE 80

CMD ["node", "server.js"]