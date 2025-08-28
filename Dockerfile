FROM node:18-alpine

WORKDIR /opt/logging_backend

COPY package*.json ./
COPY .env ./

RUN npm install --production

COPY ./src ./src/

# RUN mkdir -p ./log
# EXPOSE 8080

USER node

CMD ["npm", "run", "start"]