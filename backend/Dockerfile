FROM node:16-alpine as base
WORKDIR /src
COPY package*.json ./

FROM base as dev
ENV NODE_ENV=development
COPY ./* .
RUN npm install

CMD ["npm", "start"]