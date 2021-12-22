FROM node:17.0.0

WORKDIR /usr/app

EXPOSE 3333


COPY package.json .
COPY yarn.lock .


RUN yarn

COPY . .

CMD ["node", "ace", "serve","--watch"]
