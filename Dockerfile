FROM mhart/alpine-node

ENV NODE_ENV=production
ENV PORT=3050

COPY . /src
WORKDIR /src

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "server.js"]
