FROM keymetrics/pm2:8-alpine

# Bundle APP files
RUN mkdir -p /home/project/root
COPY . /home/project

VOLUME [ "/home/project/root" ]
ENV DOCS_SWAGGER=true

WORKDIR /home/project

ENTRYPOINT [ "pm2-runtime", "start", "apps.config.js"]
