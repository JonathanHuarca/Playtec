FROM node:latest

WORKDIR /courses-playtec

COPY package*.json ./

RUN npm install --production

COPY ./.env ./

COPY ./dist ./dist

COPY ./client ./client

ENV NODE_ENV=production

CMD ["npm", "start"]