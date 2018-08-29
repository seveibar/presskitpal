FROM node:10

RUN mkdir -p /root/app

WORKDIR /root/app

COPY package.json .
RUN npm install --production
COPY build ./build

CMD node build
