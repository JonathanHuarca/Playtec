FROM node:latest

WORKDIR /payment-playtec

COPY package*.json ./

RUN npm install --production

COPY ./.env ./

COPY ./dist ./dist

# COPY ./temp ./temp

# COPY ./client ./client

ENV NODE_ENV=production

CMD ["npm", "start"]