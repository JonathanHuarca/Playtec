FROM node:latest

WORKDIR /play-todo

COPY package*.json ./

RUN npm install --production

COPY ./.env ./

COPY ./dist ./dist

ENV NODE_ENV=production

CMD [ "npm", "start" ]