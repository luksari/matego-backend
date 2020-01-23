FROM node:lts

WORKDIR /usr/app

COPY package.json .
RUN yarn
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY src src/
RUN yarn build
EXPOSE 4000
CMD ["yarn", "start:prod"]