FROM aoinu/nodejs-jdk:latest

COPY . .

RUN npm install && npm test && npm link

ENTRYPOINT [ "jsnodetool" ]
CMD [ "--help" ]
