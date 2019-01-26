FROM openjdk:8-jdk-alpine

RUN apk add nodejs nodejs-npm python2 make g++

WORKDIR /home/nodetool

COPY . .

RUN npm install && npm test && npm link

CMD [ "jsnodetool", "--help" ]
