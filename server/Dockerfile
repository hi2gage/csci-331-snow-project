FROM node:16 as base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY src /app/



EXPOSE 8080