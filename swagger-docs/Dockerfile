FROM node:latest

WORKDIR /doc-playtec

COPY package*.json ./

RUN npm install 

COPY ./dist ./dist

CMD ["npm", "start"]
