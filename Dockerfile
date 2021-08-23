FROM keymetrics/pm2:10-alpine
LABEL maintainer="Zyao89 <zyao89@gmail.com>"

# Bundle APP files
RUN mkdir -p /home/project
COPY . /home/project

WORKDIR /home/project

# yarn install
# RUN yarn
RUN \
    npm install --production

ENV DOCS_SWAGGER=true

ENTRYPOINT [ "pm2-runtime", "start", "apps.config.js"]
