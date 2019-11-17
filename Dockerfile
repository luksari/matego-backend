FROM node:lts

WORKDIR /usr/app

COPY package.json .
RUN yarn
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY src src/
EXPOSE 3000
CMD ["yarn", "start:dev"]
