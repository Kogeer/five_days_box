FROM node:14.18.1 as base

WORKDIR /app

FROM base as local

RUN npm install mongodb-memory-server

CMD ["npm", "start"]