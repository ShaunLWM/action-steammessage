FROM node:12-alpine

RUN npm install
CMD node index.js