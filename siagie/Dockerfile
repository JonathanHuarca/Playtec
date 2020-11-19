FROM node:latest

WORKDIR /siagie-playtec

COPY package*.json ./

RUN npm install --production

COPY ./.env ./

COPY ./dist ./dist

# COPY ./client ./client

ENV NODE_ENV=production


CMD ["npm", "start"]
