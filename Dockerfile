FROM node:6.7

RUN useradd --user-group --create-home --shell /bin/bash app
RUN npm install -g --silent webpack
RUN npm install -g --silent webpack-dev-server

RUN mkdir /home/app/src

COPY . /home/app/src
WORKDIR /home/app/src
RUN chmod 767 docker-start.sh
