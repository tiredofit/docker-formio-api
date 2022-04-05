FROM docker.io/tiredofit/alpine:3.15
LABEL maintainer="Dave Conroy (github.com/tiredofit)"

### Set Defaults
ENV FORMIO_VERSION=v2.4.0 \
    FORMIO_CLIENT_VERSION=master \
    CONTAINER_ENABLE_MESSAGING=FALSE \
    CONTAINER_ENABLE_SCHEDULING=FALSE \
    CONTAINER_NAME=formio-api-app

### Install Runtime Dependencies
RUN set -x && \
    sed -i "/www-data/d" /etc/group* && \
    addgroup -S -g 82 www-data && \
    adduser -D -S -h /app -s /sbin/nologin -G www-data -g "Node" -u 3000 nodejs && \
    apk update && \
    apk upgrade && \
    apk add -t .formio-build-deps \
                git \
                g++ \
                make \
                python3 \
                && \
    apk add -t .formio-run-deps \
                nodejs \
                npm \
                yarn \
                && \
    \
    sudo -u nodejs git clone -b $FORMIO_VERSION https://github.com/formio/formio.git /app/ && \
    sudo -u nodejs git clone -b $FORMIO_CLIENT_VERSION https://github.com/formio/formio-app-formio.git /app/client && \
    \
    cd /app && \
    sudo -u nodejs npm install && \
    sudo -u nodejs npm install sendgrid && \
    \
### Misc & Cleanup
    mkdir -p /app/templates && \
    chown -R nodejs. /app && \
    apk del .formio-build-deps && \
    rm -rf /tmp/* /var/cache/apk/*

WORKDIR /app/

### Networking Configuration
EXPOSE 3001 

### Add Files
ADD install /

