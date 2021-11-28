FROM node:14

ENV UNQFY_HOST 'http://host.docker.internal:8080'
ENV NEWSLETTER_HOST 'http://host.docker.internal:3001'
ENV LOGGING_HOST 'http://host.docker.internal:3002'

WORKDIR /home/node/monitor

COPY package.json .
COPY package-lock.json .
RUN ["npm", "install"]

EXPOSE 3004

COPY . /home/node/monitor/src

RUN chown -R node:users /home/node/monitor

USER node

CMD ["npm", "run", "api"]