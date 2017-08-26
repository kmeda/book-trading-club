FROM mhart/alpine-node

ADD . /src

WORKDIR /src

EXPOSE 3000

CMD ["npm", "start"]
