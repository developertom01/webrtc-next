FROM node:16-alpine

WORKDIR /usr/opt/app

COPY ./package.json package.json
RUN yarn 

RUN yarn build 

CMD ["yarn","start"]