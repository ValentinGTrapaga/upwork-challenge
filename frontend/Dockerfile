FROM node:20

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000